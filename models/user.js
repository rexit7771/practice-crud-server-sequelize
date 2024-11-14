'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Assignment, { foreignKey: "employeeId" })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required"
        },
        notEmpty: {
          msg: "Name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email has been used" },
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Invalid Email Format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
        min: {
          args: [5],
          msg: "Password Must contain 5 Characters minimum"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "staff",
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        console.log(instance.password);

        instance.password = hashing(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};