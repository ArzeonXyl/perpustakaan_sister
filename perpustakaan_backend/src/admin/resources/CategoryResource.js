import db from '../../models/index.js';

export default {
  resource: db.Category,
  options: {
    navigation: 'Katalog',
    properties: {
      id: { isVisible: false },
      name: { isTitle: true },
    },
  },
};