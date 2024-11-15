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
    task: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Task is required"
        },
        notEmpty: {
          msg: "Task is required"
        }
      }
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Employee Id is required"
        },
        notEmpty: {
          msg: "Employee Id is required"
        }
      },
      references: {
        model: {
          tableName: "Users",
          key: "id"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "assigned",
    }
  }, {
    sequelize,
    modelName: 'Assignment',
  });
  return Assignment;
};