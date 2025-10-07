import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

import UserResource from './resources/UserResource.js';
import { authMiddleware, requireRole } from '../middlewares/authMiddleware.js';

AdminJS.registerAdapter(AdminJSSequelize);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 Setup ComponentLoader
const componentLoader = new ComponentLoader();

// 📦 Load Dashboard Component
const dashboardComponent = componentLoader.add(
  'Dashboard',
  path.join(__dirname, './components/Dashboard.jsx')
);

// 📦 Load TopBar Component (inject logout button)
const topBarComponent = componentLoader.add(
  'TopBarWithLogout',
  path.join(__dirname, './components/TopBarWithLogout.jsx')
);

const setupAdmin = async (app) => {
  const adminJs = new AdminJS({
    rootPath: '/admin',
    resources: [UserResource],
    branding: {
      companyName: 'ifno',
      softwareBrothers: false,
      components: {
        TopBar: topBarComponent, // ✅ inject custom TopBar
      },
    },
    dashboard: {
      component: dashboardComponent, // ✅ custom dashboard
    },
    componentLoader,
  });

  const adminRouter = AdminJSExpress.buildRouter(adminJs);

  app.use(
    '/admin',
    authMiddleware,
    requireRole('admin'),
    (req, res, next) => {
      adminJs.options.currentUser = {
        email: req.user.email,
        role: req.user.role,
      };
      next();
    },
    adminRouter
  );
};

export default setupAdmin;