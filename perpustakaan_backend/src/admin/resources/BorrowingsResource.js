// src/admin/resources/BorrowingsResource.js
import AdminJS from 'adminjs';
import db from '../../models/index.js';
import { Components } from '../componentLoader.js';
import { getIO } from '../../socket.js'; 

const broadcast = (msg) => {
  try {
    getIO().emit('dbUpdate', { type: 'borrowing_update', message: msg });
  } catch (e) {
    // console.log('Socket not ready');
  }
};

const BorrowingsResource = {
  resource: db.Borrowings,
  options: {
    navigation: 'Transaksi',
    
    listProperties: ['id', 'user_id', 'book_id', 'borrow_date', 'due_date', 'status', 'fine_amount'],
    showProperties: ['id', 'user_id', 'book_id', 'borrow_date', 'due_date', 'return_date', 'status', 'fine_amount'],
    editProperties: ['status', 'return_date', 'fine_amount'],
    filterProperties: ['status', 'user_id', 'book_id', 'borrow_date', 'due_date'],
    
    actions: {
      // 🎯 1. Approve Request
      approveRequest: {
        actionType: 'record',
        icon: 'Check',
        label: 'Setujui',
        guard: 'Setujui peminjaman ini? (Stok buku akan berkurang)',
        component: false, 
        isVisible: ({ record }) => record?.params?.status === 'Menunggu Persetujuan',
        handler: async (request, response, context) => {
          const { record } = context;
          const recordId = record.id();
          const bookId = record.get('book_id');
          
          try {
            const book = await db.Book.findByPk(bookId);
            if (!book) throw new Error('Buku tidak ditemukan');
            if (book.quantity < 1) throw new Error('Stok buku habis!');

            await db.sequelize.transaction(async (t) => {
              await db.Borrowings.update(
                { status: 'Dipinjam' }, 
                { where: { id: recordId }, transaction: t }
              );
              await db.Book.update(
                { quantity: db.sequelize.literal('quantity - 1') },
                { where: { id: bookId }, transaction: t }
              );
            });

            broadcast('Peminjaman disetujui');

            return {
              record: record.toJSON(),
              // 👇 FIX: Ganti 'Borrowings' jadi 'borrowings' (huruf kecil)
              redirectUrl: `/admin/resources/borrowings/records/${recordId}/show`,
              notice: { message: '✅ Disetujui (Stok -1)', type: 'success' }
            };
          } catch (error) {
            return {
              record: record.toJSON(),
              notice: { message: `❌ Gagal: ${error.message}`, type: 'error' }
            };
          }
        }
      },

      // 🎯 2. Reject Request
      rejectRequest: {
        actionType: 'record',
        icon: 'Close',
        label: 'Tolak',
        guard: 'Tolak peminjaman ini?',
        component: false, 
        isVisible: ({ record }) => record?.params?.status === 'Menunggu Persetujuan',
        handler: async (request, response, context) => {
          const recordId = context.record.id();
          await db.Borrowings.update({ status: 'Ditolak' }, { where: { id: recordId } });
          broadcast('Peminjaman ditolak');
          return {
            record: context.record.toJSON(),
            // 👇 FIX: Ganti 'Borrowings' jadi 'borrowings'
            redirectUrl: `/admin/resources/borrowings/records/${recordId}/show`,
            notice: { message: '❌ Peminjaman ditolak', type: 'default' }
          };
        }
      },

      // 🎯 3. Return Book
      returnBook: {
        actionType: 'record',
        icon: 'Undo',
        label: 'Kembalikan',
        guard: 'Kembalikan buku sekarang? (Stok akan bertambah)',
        component: false, 
        isVisible: ({ record }) => ['Dipinjam', 'Terlambat'].includes(record?.params?.status),
        handler: async (request, response, context) => {
          const { record } = context;
          const recordId = record.id();
          const bookId = record.get('book_id');
          const userId = record.get('user_id');
          
          try {
            const today = new Date();
            const dueDate = new Date(record.get('due_date'));
            let status = 'Dikembalikan';
            let fineAmount = 0;

            if (today > dueDate) {
              status = 'Terlambat';
              const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
              fineAmount = daysLate * 5000;

              const [existing] = await db.sequelize.query(
                "SELECT id FROM fines WHERE borrowing_id = :bid LIMIT 1",
                { replacements: { bid: recordId }, type: db.sequelize.QueryTypes.SELECT }
              );
              
              if (!existing) {
                await db.sequelize.query(`
                  INSERT INTO fines (borrowing_id, user_id, book_id, fine_date, days_late, fine_per_day, total_fine, paid_status, created_at)
                  VALUES (:bid, :uid, :bkid, CURDATE(), :days, 5000, :total, 'Belum Dibayar', NOW())
                `, { replacements: { bid: recordId, uid: userId, bkid: bookId, days: daysLate, total: fineAmount } });
              }
            }

            await db.sequelize.transaction(async (t) => {
               await db.Borrowings.update({
                 return_date: today,
                 status: status,
                 fine_amount: fineAmount
               }, { where: { id: recordId }, transaction: t });

               await db.Book.update(
                 { quantity: db.sequelize.literal('quantity + 1') },
                 { where: { id: bookId }, transaction: t }
               );
            });

            broadcast('Buku dikembalikan');

            return {
              record: record.toJSON(),
              // 👇 FIX: Ganti 'Borrowings' jadi 'borrowings'
              redirectUrl: `/admin/resources/borrowings/records/${recordId}/show`,
              notice: { 
                message: `✅ Buku kembali. ${fineAmount > 0 ? `Denda: Rp${fineAmount}` : ''}`, 
                type: fineAmount > 0 ? 'warning' : 'success' 
              }
            };
          } catch (error) {
            return { record: record.toJSON(), notice: { message: error.message, type: 'error' } };
          }
        }
      },
      
      // 🎯 4. Manage Fine
      manageFine: {
        actionType: 'record',
        icon: 'Money',
        label: 'Bayar Denda',
        component: false, 
        isVisible: ({ record }) => {
          const p = record?.params || {};
          return parseFloat(p.fine_amount) > 0 && p.status === 'Terlambat';
        },
        handler: async (request, response, context) => {
          const borrowingId = context.record.id();
          try {
            const fines = await db.sequelize.query(
              `SELECT id FROM fines WHERE borrowing_id = :bid LIMIT 1`,
              { replacements: { bid: borrowingId }, type: db.sequelize.QueryTypes.SELECT }
            );
            if (fines.length === 0) throw new Error("Tagihan denda belum dibuat.");
            
            // 👇 FIX: Ganti 'Fines' jadi 'fines' (huruf kecil semua)
            return { redirectUrl: `/admin/resources/fines/records/${fines[0].id}/markAsPaid` };
          } catch (e) {
            return { notice: { message: e.message, type: 'error' } };
          }
        }
      }
    },

    properties: {
      status: {
        isVisible: { list: true, filter: true, show: true, edit: true },
        components: {
          list: Components.StatusBadge,
          show: Components.StatusBadge,
        },
        availableValues: [
          { value: 'Menunggu Persetujuan', label: '⏳ Menunggu' },
          { value: 'Dipinjam', label: '📖 Dipinjam' },
          { value: 'Ditolak', label: '❌ Ditolak' },
          { value: 'Dikembalikan', label: '✅ Dikembalikan' },
          { value: 'Terlambat', label: '⚠️ Terlambat' }
        ]
      },
      fine_amount: {
        isVisible: { list: true, filter: false, show: true, edit: false },
        type: 'currency',
        props: { prefix: 'Rp', decimalSeparator: ',', thousandSeparator: '.', decimalScale: 0 }
      }
    }
  }
};

export default BorrowingsResource;