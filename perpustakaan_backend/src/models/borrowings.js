export default (sequelize, DataTypes) => {
  const Borrowings = sequelize.define('Borrowings', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    borrow_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Dipinjam', 'Dikembalikan', 'Terlambat','Menunggu Persetujuan'), // ✅ cocok dengan DB
      allowNull: false,
      defaultValue: 'Menunggu Persetujuan',
    },
    fine_amount: {
      type: DataTypes.DECIMAL(10, 2), // ✅ cocok dengan decimal(10,2) di DB
      defaultValue: 0.00,
    },
  }, {
    tableName: 'borrowings',
    timestamps: false,
  });

  Borrowings.associate = (models) => {
    Borrowings.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Borrowings.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
  };

  return Borrowings;
};