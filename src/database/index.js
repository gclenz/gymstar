import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import User from '../app/models/User';
import Student from '../app/models/Student';

const connection = new Sequelize(dbConfig);

User.init(connection);
Student.init(connection);

export default connection;
