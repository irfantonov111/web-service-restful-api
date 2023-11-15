const { Todos } = require("../models");

module.exports = {
  getTodos: async (req, res) => {
    try {
      const authUserId = res.dataUser.id;

      let data = await Todos.findAll({
        attributes: ["id", "value"],
        where: {
          userId: authUserId,
        },
      });

      return res.status(200).json({
        message: "succesfully get todo data",
        data: data,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getTodoById: async (req, res) => {
    try {
      const { todoId } = req.params;

      const todo = await Todos.findOne({
        where: {
          id: todoId,
        },
      });

      if (!todo) {
        return res.status(400).json({ message: "Todo not found" });
      }

      return res.status(200).json({
        message: "sucessfully get todo by Id",
        todo: todo,
      });
    } catch (error) {
      console.log("error nya adalah :"+error)
      return res.status(500).json(error);
  
    }
  },


  createTodo: async (req, res) => {
    try {
      const { value } = req.body;
      const authUserId = res.dataUser.id;

      const todo = await Todos.create({
        value,
        status: false,
        userId: authUserId,
      });

      return res.status(201).json({
        message: "sucessfully create todo",
        todo: todo,
      });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json(error);
    }
  },
  updateTodo: async (req, res) => {
    try {
      const { todoId } = req.params;
      const { value } = req.body;

      const data = { value };

      await Todos.update(data, {
        where: {
          id: +todoId,
        },
      });

      const todoUpdate = await Todos.findOne({
        attributes: ["id", "value", "status"],
        where: {
          id: +todoId,
        },
      });

      return res
        .status(200)
        .json({ message: "Sucessfully update data", todo: todoUpdate });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json(error);
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const { todoId } = req.params;

      if (!todoId) {
        return res.status(400).json({ message: "Todo not Found" });
      }

      await Todos.destroy({
        where: {
          id: todoId,
        },
      });

      return res
        .status(200)
        .json({ message: `succesfully delete todo id (${todoId})` });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteAllTodo: async (req, res) => {
    try {
      const userId = res.dataUser.id;

      await Todos.destroy({
        where: {
          userId: userId,
        },
      });

      return res.status(200).json({ message: "Succesfully delete all Todo" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
