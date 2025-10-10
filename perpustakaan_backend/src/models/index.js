import sequelize from '../config/sequelize.js';
import { Sequelize, DataTypes } from 'sequelize';
import BookModel from './book.js';
import CategoryModel from './category.js';
import UserModel from './user.js';
import BorrowingsModel from './borrowings.js';




const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Book = BookModel(sequelize, DataTypes);
db.Category = CategoryModel(sequelize, DataTypes);
db.User = UserModel(sequelize, DataTypes);
db.Borrowings = BorrowingsModel(sequelize, DataTypes);

Object.values(db).forEach(model => {
  if (model.associate) model.associate(db);
});

export default db;