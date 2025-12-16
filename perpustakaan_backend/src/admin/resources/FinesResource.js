// src/admin/resources/FinesResource.js
import AdminJS from 'adminjs';
import db from '../../models/index.js';
import { Components } from '../componentLoader.js'; // 👈 1. Import ini wajib

const FinesResource = {
  resource: db.Fines,
  options: {
    navigation: 'Transaksi',
    
    listProperties: [
      'id', 'user_id', 'borrowing_id', 'fine_date', 'days_late', 'total_fine', 'paid_status'
    ],
    
    showProperties: [
      'id', 'user_id', 'borrowing_id', 'fine_date', 'days_late', 'fine_per_day', 
      'total_fine', 'paid_status', 'paid_date', 'created_at', 'updated_at'
    ],
    
    editProperties: ['paid_status', 'paid_date'],
    
    filterProperties: ['user_id', 'borrowing_id', 'paid_status', 'fine_date'],
    
    actions: {
      edit: { isVisible: true },
      
      // 🎯 Mark As Paid
      markAsPaid: {
        actionType: 'record',
        icon: 'CheckCircle',
        label: 'Tandai Sudah Dibayar',
        guard: 'Yakin menandai denda ini sebagai sudah dibayar?',
        component: false, // 👈 WAJIB: Agar langsung eksekusi tanpa UI
        isVisible: ({ record }) => {
          const params = record?.params || {};
          return params.paid_status === 'Belum Dibayar';
        },
        handler: async (request, response, context) => {
          const { record } = context;
          const recordId = record.id();
          const borrowingId = record.get('borrowing_id');
          
          try {
            const today = new Date();
            
            // 1. Update tabel Fines
            await db.Fines.update({
              paid_status: 'Sudah Dibayar',
              paid_date: today
            }, {
              where: { id: recordId }
            });

            // 2. Update tabel Borrowings juga agar sinkron (Status jadi Dikembalikan)
            if (borrowingId) {
               await db.Borrowings.update({
                 status: 'Dikembalikan',
                 return_date: today
               }, {
                 where: { id: borrowingId }
               });
            }
            
            return {
              record: record.toJSON(),
              redirectUrl: `/admin/resources/fines/records/${recordId}/show`,
              notice: {
                message: '✅ Denda lunas & Buku dikembalikan',
                type: 'success'
              }
            };
            
          } catch (error) {
            console.error('Error marking fine as paid:', error);
            return {
              record: record.toJSON(),
              notice: {
                message: `❌ Gagal: ${error.message}`,
                type: 'error'
              }
            };
          }
        }
      }
    },
    
    properties: {
      id: { isVisible: { list: true, filter: true, show: true, edit: false } },
      user_id: { isVisible: { list: true, filter: true, show: true, edit: false }, reference: 'users' },
      borrowing_id: { isVisible: { list: true, filter: true, show: true, edit: false }, reference: 'borrowings' },
      fine_date: { isVisible: { list: true, filter: true, show: true, edit: false }, type: 'date' },
      days_late: { isVisible: { list: true, filter: false, show: true, edit: false } },
      fine_per_day: { 
        isVisible: { list: false, filter: false, show: true, edit: false }, 
        type: 'currency', props: { prefix: 'Rp', decimalScale: 0 } 
      },
      total_fine: { 
        isVisible: { list: true, filter: false, show: true, edit: false }, 
        type: 'currency', props: { prefix: 'Rp', decimalScale: 0 } 
      },
      
      // 👇 2. Tambahkan konfigurasi komponen di sini
      paid_status: {
        isVisible: { list: true, filter: true, show: true, edit: true },
        components: {
          list: Components.StatusBadge, // Gunakan badge di tabel
          show: Components.StatusBadge, // Gunakan badge di detail
        },
        availableValues: [
          { value: 'Belum Dibayar', label: '💸 Belum Dibayar' },
          { value: 'Sudah Dibayar', label: '✅ Sudah Dibayar' }
        ]
      },
      
      paid_date: {
        isVisible: { list: false, filter: false, show: true, edit: true },
        type: 'date', props: { dateFormat: 'yyyy-MM-dd' }
      },
      created_at: { isVisible: { list: false, filter: false, show: true, edit: false }, type: 'datetime' },
      updated_at: { isVisible: { list: false, filter: false, show: true, edit: false }, type: 'datetime' }
    }
  }
};

export default FinesResource;