const http = require("http");
const PORT = 5500;

const server = http.createServer((req, res) => {

    console.log("Server is running.")

    const { method, url } = req;
    // console.log(method);
    // console.log(url);

    res.writeHead(200, {
        "Content-Type" : "text/html"
    })

    res.write("<h2>Hello from web server!</h2>")
    res.end()
})

server.listen(PORT);
console.log(`Server is listening on port -> ${PORT}`)