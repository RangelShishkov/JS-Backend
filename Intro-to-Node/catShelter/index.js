const http = require("http");
const homeHtml = require('./views/home/index.js');
const siteCss = require('./content/styles/site.js');
const addBreedHtml = require('./views/addBreed.js');
const catTemplate = require('./views/home/catTemplate.js');
const PORT = 5200;

const cats = [
    {
        imageUrl: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        name: 'Tsunami',
        breed: 'Ulichna1',
        description: 'very cute cat1',
    },
    {
        imageUrl: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
        name: 'Thunder',
        breed: 'Prevuzhodna1',
        description: 'very cute cat2',
    },
    {
        imageUrl: 'https://www.4pawsveterinaryhospital.com/wp-content/uploads/sites/239/2022/03/Cat-facts-1240x650.jpg',
        name: 'Sandstorm',
        breed: 'Ulichna2',
        description: 'very cute cat3',
    },
    {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juvenile_Ragdoll.jpg',
        name: 'Thunderstorm',
        breed: 'Prevuzhodna2',
        description: 'very cute cat4',
    }
]

const server = http.createServer((req, res) => {
    const { url } = req;

    if (url === '/') {
        const imageUrlPattern = /{{imageUrl}}/g;
        const namePattern = /{{name}}/g;
        const breedPattern = /{{breed}}/g;
        const descriptionPattern = /{{description}}/g;

        const catHtml = cats.map(cat => catTemplate.replace(imageUrlPattern, cat.imageUrl).replace(namePattern, cat.name)
        .replace(breedPattern, cat.breed).replace(descriptionPattern, cat.description));

        const homeHtmlTemplate = homeHtml.replace("{{cats}}", catHtml);

        res.writeHead(200, {
            "Content-Type": "text/html",
        });

        res.write(homeHtmlTemplate);
    } else if (url === '/content/styles/site.css') {
        res.writeHead(200, {
            "Content-Type": "text/css"
        })
        res.write(siteCss);
    } else if (url === '/cats/add-breed') {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.write(addBreedHtml);
    }

    res.end();
});
server.listen(PORT, () => console.log(`Server is listening on port -> ${PORT}`));