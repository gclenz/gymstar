import { Model, DataTypes } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        age: DataTypes.INTEGER,
        weight: DataTypes.DECIMAL,
        height: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default Student;
