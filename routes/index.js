const express = require("express");
const route = express.Router();
const userRoute = require("./user.route");
const todoRoute = require("./todo.route");

route.get("/", (req, res) => {
  res.json({
    msg: "Server is running",
  });
});

route.use("/users", userRoute);
route.use("/todos", todoRoute);

module.exports = route;
