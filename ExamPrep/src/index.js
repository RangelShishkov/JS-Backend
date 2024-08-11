const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { auth } = require("./middlewares/authMiddleware");

const { PORT, DB_URL } = require("./constants");
const routes = require("./router");

const app = express();

//Express Config
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);

//View Engine config
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

//Database connection
async function dbConnect() {
  await mongoose.connect(DB_URL);
}

dbConnect()
  .then(() => {
    console.log("Successfully connected to the DB!");
  })
  .catch((error) => {
    console.log(`Error while connecting to the DB -> ${error}`);
  });

//Routes
app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
