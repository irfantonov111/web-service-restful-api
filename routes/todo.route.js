const express = require("express");
const route = express.Router();
const { authentication } = require("../middleware/authentication");
const {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
} = require("../controllers/todo.controllers");
const { authorizationTodo } = require("../middleware/authorization");

route.get("/", authentication, getTodos);
route.post("/", authentication, createTodo);
route.get("/:todoId", authentication, authorizationTodo, getTodoById);
route.put("/:todoId", authentication, authorizationTodo, updateTodo);
route.delete("/:todoId", authentication, authorizationTodo, deleteTodo);
route.delete("/", authentication, deleteAllTodo);

module.exports = route;
