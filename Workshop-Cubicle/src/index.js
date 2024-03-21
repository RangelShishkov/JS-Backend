//Imports
const express = require("express");

const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const dbConnect = require("./config/dbConfig");

const { PORT } = require("./constants");
const routes = require("./router");

//Connecting to the database
dbConnect()
  .then(() => console.log('Successfully connected to the DB'))
  .catch((err) => console.log(`Error while connecting to DB: ${err}`));

//Local Variables
const app = express();

//Configs
expressConfig(app);
handlebarsConfig(app);

//Routing
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
