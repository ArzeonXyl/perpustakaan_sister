import User from '../../models/user.js';

export default {
  resource: User,
  options: {
    properties: {
      password_hash: { isVisible: false },
    },
    actions: {
      delete: { isAccessible: false },
    },
  },
};