// src/admin/componentLoader.js
import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

const Components = {
  // 1. Komponen Bawaan AdminJS -> WAJIB Pakai .override()
  //    Karena 'TopBar' sudah ada di dalam sistem AdminJS, kita timpa dengan file kita.
  TopBar: componentLoader.override('TopBar', path.join(__dirname, './components/TopBarWithLogout')),

  // 2. Komponen Custom (Buatan Sendiri) -> Pakai .add()
  //    'Dashboard' di AdminJS dianggap custom page component, jadi pakai .add() aman.
  Dashboard: componentLoader.add('Dashboard', path.join(__dirname, './components/Dashboard')),
  
  ReturnBookForm: componentLoader.add('ReturnBookForm', path.join(__dirname, './components/ReturnBookForm')),
  ManageFineForm: componentLoader.add('ManageFineForm', path.join(__dirname, './components/ManageFineForm')),
  
  // 👇 Ini komponen baru kita
  StatusBadge: componentLoader.add('StatusBadge', path.join(__dirname, './components/StatusBadge')),
};

export default componentLoader;
export { Components };