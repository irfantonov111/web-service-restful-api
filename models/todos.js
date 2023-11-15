"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  Todos.init(
    {
      value: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Input todo cannot be empty",
          },
        },
      },
      status: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todos",
    }
  );
  return Todos;
};
