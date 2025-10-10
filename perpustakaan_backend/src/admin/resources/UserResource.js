import db from '../../models/index.js';

export default {
  resource: db.User,
  options: {
    navigation: 'Pengguna',
    properties: {
      password_hash: { isVisible: false },
      email: { isTitle: true },
    },
  },
};