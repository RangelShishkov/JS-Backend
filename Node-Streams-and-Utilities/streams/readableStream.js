const fs = require("fs");

//stream
const readStream = fs.createReadStream("./input.html", {encoding: "utf-8", highWaterMark: 10000});

//on -> events
readStream.on('data', (chunk)=>{
    console.log("reading chunk...");
    console.log(chunk);
});

readStream.on('end', ()=>{
    console.log("Reading has finished!");
});