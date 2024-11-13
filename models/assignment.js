'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assignment.belongsTo(models.User, { foreignKey: "employeeId" })
    }
  }
  Assignment.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name is required"
        },
        notNull: {
          msg: "Name is required"
        }
      }
    },
    employeeId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: "Employee Id is required",
        notNull: "Employee Id is required"
      },
      references: {
        model: {
          tableName: "Users",
          key: "id"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Assignment',
  });
  return Assignment;
};