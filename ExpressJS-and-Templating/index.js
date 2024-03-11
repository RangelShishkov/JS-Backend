const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = 5100;

const {getCars, addCar} = require('./cars')

//View Engine
app.engine("hbs", handlebars.engine({extname: "hbs"}));
app.set("view engine", "hbs");

//Middleware
//Third-party middleware
const bodyParser = express.urlencoded({ extended: false });
app.use(bodyParser);

const staticFile = express.static("public");
app.use(staticFile);

//Global routing middleware
app.use((req, res, next) => {
    console.log(`HTTP Request: ${req.method}, Request path: ${req.path}`);
    next();
})

//Partial routing middleware
app.use('/cars', (req, res, next) => {
    console.log("Middleware has been invoked!");
    next();
})
//Specific route middleware
const specificMiddleware = (req, res, next) => {
    console.log('This is the specific route middleware!');
    next();
}

//Routing
app.get('/', (req, res) => {
    // res.send('Welcome, this is the home page!');
    res.render("home");
});

app.get('/about', (req, res) => {
    res.render("about")
})

//Endpoint - method, path, action.
//GET - method; /cars - path; action - (req, res) => {};
app.get('/cars', (req, res) => {
    const cars = getCars();
    res.render('cars', cars)
    // res.send(`<!DOCTYPE html>
    //     <html lang="en">
        
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <link rel="stylesheet" href="./css/styles.css">
    //         <title>Document</title>
    //     </head>
        
    //     <body>
        
    //         <form method="post" >
    //             <label for="name">Model:</label>
    //             <br>
    //             <input type="text" id="name" name="name">
    //             <br>
    //             <label for="year">Year:</label>
    //             <br>
    //             <input type="text" id="year" name="year" >
    //             <br>
    //             <br>
    //             <input type="submit" value="Create Car">
    //         </form>
        
    //     </body>
        
    //     </html>`);

});

app.get('/cars/:carsId', (req, res) => {
    const carId = Number(req.params.carsId)
    if (!carId) {
        res.status(404).send(`Bad id: ` + req.params.carsId);
    }
    res.send(`This is the car with id: ${carId}`);
});

app.get('/specific', specificMiddleware,
    (req, res) => {
        res.send('This is specific route!')
    })

// !Dont do this
// app.get('/public/css/styles.css', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/css', 'styles.css'))
// })

app.get('/download-png', (req, res) => {
    res.download('./cut2.png');
});

app.get('/send-file', (req, res) => {
    res.sendFile(path.resolve(__dirname, './cut2.png'));
});

app.get('/route-redirect', (req, res) => {
    res.redirect('/cars');
})

app.post('/cars', (req, res) => {
    console.log(req.body);
    const model = req.body.name;
    const year = Number(req.body.age);
    addCar(model,year);
    res.send('New car has been created!');
});

app.get('*', (req, res) => {
    res.status(404).send('Sorry, something went wrong!');
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));