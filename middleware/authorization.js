const { User, Todos } = require("../models");

module.exports = {
  authorizationUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const authenticationUserId = res.dataUser.id;

      const userById = await User.findOne({
        where: {
          id: +userId,
        },
      });

      console.log(authenticationUserId);
      console.log(userById.id);

      if (!userById) {
        return res.status(401).json({ message: "User not found" });
      }

      if (userById.id === authenticationUserId) {
        return next();
      } else {
        return res.status(403).json({ message: "FORBIDDEN" });
      }
    } catch (error) {
      console.log("scope err authorization");
      return res.status(500).json(error);
    }
  },
  authorizationTodo: async (req, res, next) => {
    try {
      const { todoId } = req.params;
      const authenticationUserId = res.dataUser.id;

      const todoById = await Todos.findOne({
        where: {
          id: +todoId,
        },
      });

      if (!todoById) {
        return res.status(401).json({ message: "Todo not found" });
      }

      if (todoById.userId === authenticationUserId) {
        return next();
      } else {
        return res.status(403).json({ message: "FORBIDDEN" });
      }
    } catch (error) {
      console.log("scope err authorization");
      return res.status(500).json(error);
    }
  },
};
