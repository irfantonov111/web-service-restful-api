const { User } = require("../models");
const { verifyToken } = require("../helper/jwt");

module.exports = {
  authentication: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const userDecoded = verifyToken(token);
      console.log(userDecoded);

      const userById = await User.findOne({
        where: {
          id: userDecoded.id,
        },
      });

      if (!userById) {
        return res.status(401).json({
          message: "No Active account found with the given credentials",
        });
      }

      res.dataUser = userById;
      return next();
    } catch (error) {
      console.log("error authentication");
      return res.status(500).json({ msg: error });
    }
  },
};
