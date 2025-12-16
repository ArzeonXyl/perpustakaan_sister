// src/models/Fines.js (update)
import { DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  const Fines = sequelize.define('Fines', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    borrowing_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fine_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    days_late: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fine_per_day: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 5000.00
    },
    total_fine: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    paid_status: {
      type: DataTypes.ENUM('Belum Dibayar', 'Sudah Dibayar'),
      allowNull: false,
      defaultValue: 'Belum Dibayar'
    },
    paid_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'fines',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });

  Fines.associate = (models) => {
    Fines.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Fines.belongsTo(models.Borrowings, { foreignKey: 'borrowing_id', as: 'borrowing' });
  };

  return Fines;
};