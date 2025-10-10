import db from '../../models/index.js';

export default {
  resource: db.Borrowings,
  options: {
    navigation: 'Transaksi',
    actions: {
      returnBook: {
        actionType: 'record',
        icon: 'Undo',
        label: 'Kembalikan Buku',
        isVisible: ({ record }) =>
          ['Dipinjam', 'Terlambat'].includes(record?.params?.status),
        handler: async (req, res, context) => {
          const { record } = context;
          const today = new Date();
          const dueDate = new Date(record.param('due_date'));

          let status = 'Dikembalikan';
          let fine = 0;

          if (today > dueDate) {
            status = 'Terlambat';
            const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
            fine = daysLate * 1000;
          }

          await record.update({
            return_date: today,
            status,
            fine_amount: fine,
          });

          return {
            record: record.toJSON(),
            notice: {
              message: `Buku berhasil dikembalikan. Status: ${status}, Denda: Rp${fine}`,
              type: 'success',
            },
          };
        },
      },

      approveRequest: {
        actionType: 'record',
        icon: 'Check',
        label: 'Setujui Peminjaman',
        guard: 'Yakin ingin menyetujui peminjaman ini?',
        isVisible: ({ record }) => record?.params?.status === 'Menunggu Persetujuan',
        handler: async (req, res, context) => {
          const { record } = context;

          await record.update({ status: 'Dipinjam' });

          return {
            record: record.toJSON(),
            notice: {
              message: 'Peminjaman disetujui',
              type: 'success',
            },
          };
        },
      },

      rejectRequest: {
        actionType: 'record',
        icon: 'Close',
        label: 'Tolak Peminjaman',
        guard: 'Yakin ingin menolak peminjaman ini?',
        isVisible: ({ record }) => record?.params?.status === 'Menunggu Persetujuan',
        handler: async (req, res, context) => {
          const { record } = context;

          await record.update({ status: 'Ditolak' });

          return {
            record: record.toJSON(),
            notice: {
              message: 'Peminjaman ditolak',
              type: 'error',
            },
          };
        },
      },
    },
  },
};

