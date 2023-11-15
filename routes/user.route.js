const express = require("express");
const route = express.Router();
const {
  register,
  login,
  deleteUserById,
} = require("../controllers/user.controller");
const { authentication } = require("../middleware/authentication");
const { authorizationUser } = require("../middleware/authorization");

route.get("/", (req, res) => {
  res.json({
    msg: "user server running",
  });
});

route.post("/register", register);
route.post("/login", login);
route.delete("/:userId", authentication, authorizationUser, deleteUserById);

module.exports = route;
