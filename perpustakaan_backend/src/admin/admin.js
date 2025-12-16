// src/admin/admin.js
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

import db from '../models/index.js';
import UserResource from './resources/UserResource.js';
import CategoryResource from './resources/CategoryResource.js';
import BorrowingsResource from './resources/BorrowingsResource.js';
import FinesResource from './resources/FinesResource.js';
import { authMiddleware, requireRole } from '../middlewares/authMiddleware.js';

import componentLoader, { Components } from './componentLoader.js';

AdminJS.registerAdapter(AdminJSSequelize);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resource Buku Custom
const bookResource = {
  resource: db.Book,
  options: {
    navigation: 'Katalog',
    properties: {
      id: { isVisible: false },
      title: { isTitle: true },
      author: { position: 2 },
      publication_year: { position: 3 },
      quantity: { position: 4 },
      category_id: {
        reference: 'categories',
        position: 5,
      },
    },
  },
};

const setupAdmin = async (app) => {
  console.log('🔄 Setting up AdminJS...');
  
  // 1. Serve Folder Public
  // Agar browser bisa mengakses file /admin-socket.js yang kita buat di atas
  app.use(express.static(path.join(__dirname, '../public')));
  
  const adminJs = new AdminJS({
    rootPath: '/admin',
    resources: [
      UserResource,
      BorrowingsResource,
      FinesResource,
      bookResource,
      CategoryResource,
    ],
    branding: {
      companyName: 'IFNO Perpustakaan',
      softwareBrothers: false,
      logo: false,
      withMadeWithLove: false,
      theme: {
        colors: {
          primary100: '#3498db',
          primary80: '#5dade2',
          primary60: '#85c1e9',
          primary40: '#aed6f1',
          primary20: '#d6eaf8',
          grey100: '#1d1d1d',
          grey80: '#454545',
          grey60: '#7a7a7a',
          grey40: '#bdbdbd',
          grey20: '#e0e0e0',
          white: '#ffffff',
        }
      },
    },
    dashboard: {
      component: Components.Dashboard,
    },
    componentLoader, 
    // 2. Inject Script ke Browser Admin
    assets: {
      styles: [],
      scripts: [
        '/socket.io/socket.io.js', // Library Client Socket.IO (Otomatis dari server)
        '/admin-socket.js'         // Script Listener kita di folder public
      ]
    },
    pages: {
      stats: {
        label: 'Statistik',
        handler: async (req, res) => {
          try {
            const stats = await db.sequelize.query(`
              SELECT 
                (SELECT COUNT(*) FROM borrowings WHERE status = 'Menunggu Persetujuan') as pending_borrowings,
                (SELECT COUNT(*) FROM borrowings WHERE status = 'Terlambat') as late_borrowings,
                (SELECT COUNT(*) FROM fines WHERE paid_status = 'Belum Dibayar') as unpaid_fines,
                (SELECT COALESCE(SUM(total_fine), 0) FROM fines WHERE paid_status = 'Belum Dibayar') as total_unpaid_amount,
                (SELECT COALESCE(SUM(total_fine), 0) FROM fines WHERE paid_status = 'Sudah Dibayar') as total_paid_amount,
                (SELECT COUNT(*) FROM users WHERE role = 'peminjam') as total_members,
                (SELECT COUNT(*) FROM books) as total_books
            `, { type: db.sequelize.QueryTypes.SELECT });
            
            return {
              text: 'Statistik Sistem',
              stats: stats[0]
            };
          } catch (error) {
            console.error('Error fetching stats:', error);
            return { text: 'Statistik Sistem', error: 'Gagal mengambil data' };
          }
        },
        component: 'Dashboard'
      }
    }
  });

  const adminRouter = AdminJSExpress.buildRouter(adminJs);

  app.use(
    '/admin',
    authMiddleware,
    requireRole('admin'),
    adminRouter
  );
  
  console.log('✅ AdminJS setup completed');
};

export default setupAdmin;