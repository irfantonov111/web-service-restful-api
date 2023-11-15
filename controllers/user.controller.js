const { User } = require("../models");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");

module.exports = {
  register: async (req, res) => {
    try {
      let { username, email, password } = req.body;

      if (!password) {
        return res.status(400).json({ message: "password cannot be empty" });
      }

      const hashedPassword = hashPassword(password);
      await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        username,
        email,
      });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ msg: error });
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      } else {
        const compare = comparePassword(password, user.password);
        if (!compare) {
          return res.status(400).json({ message: "password is wrong" });
        } else {
          const token = generateToken({
            id: user.id,
            username: user.username,
            email: user.email,
          });
          return res.status(200).json({ token: token });
        }
      }
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ msg: error });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      await User.destroy({
        where: {
          id: userId,
        },
      });

      return res.status(200).json({
        message: `Account ${user.username} has been succesfully deleted`,
      });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ msg: error });
    }
  },
};
