const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
const PORT = 5100;

//View engine
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");

//Third-Party MIDDLEWARE
const bodyParser = express.urlencoded({ extended: false });
app.use(bodyParser);

const staticFile = express.static("content");
app.use(staticFile);


//Routing
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/add-breed", (req, res) => {
    res.render("addBreed");
})

app.get("/add-cat", (req, res) => {
    res.render("addCat");
})

app.post("/add-breed", (req, res) => {
    const breedName = req.body.breed;
    res.redirect("/");
})



app.get('*', (req, res) => {
    res.status(404).send('Sorry, something went wrong!');
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));