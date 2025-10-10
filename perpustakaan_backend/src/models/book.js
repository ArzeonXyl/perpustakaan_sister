export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    publication_year: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  }, {
    tableName: 'books',
    timestamps: false,
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  };

  return Book;
};