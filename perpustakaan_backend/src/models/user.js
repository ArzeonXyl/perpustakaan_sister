import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  password_hash: { type: DataTypes.STRING },
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;