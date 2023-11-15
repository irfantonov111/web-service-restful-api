const express = require("express");
const app = express();
const routeAll = require("./routes");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(routeAll);

app.listen(PORT, () => {
  console.log("Server running in port " + PORT);
});
