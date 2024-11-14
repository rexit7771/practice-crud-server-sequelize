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
      validate: {
        isEmail: {
          msg: "Invalid Email Format"
        },
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
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
      validate: {
        notNull: {
          msg: "Role is required"
        },
        notEmpty: {
          msg: "Role is required"
        },
      }
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