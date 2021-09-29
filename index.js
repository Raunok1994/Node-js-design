const http = require("http");
const fs = require("fs");
var requests = require("requests");


const homeFile = fs.readFileSync("home.html","utf-8");

const replaceVal = (tempVal, orgVal) => {
     let temperature = document.querySelector("temp").innerHTML;  
     console.log(temperature);
     temperature = tempVal.replace(text, orgVal.main.temp);
     temperature = tempVal.replace("{%tempmin%}", orgVal.main.temp_min);
     temperature = tempVal.replace("{%tempmax%}", orgVal.main.temp_max);
     temperature = tempVal.replace("{%location%}", orgVal.name);
     temperature = tempVal.replace("{%country%}", orgVal.sys.country);
     temperature = tempVal.replace("{%tempstatus%}", orgVal.weather[0].main);
      
   return temperature;
};

const server = http.createServer ((req, res) => {

if(req.url == "/"){  
   requests('https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=c276a22581637fc6fa64b5c5b3ce3738')
   .on('data',  (chunk) => {
      console.log("data",chunk); // JSON Data 
      const objdata = JSON.parse(chunk); // JSON -> Object Data 
      const arrData = [objdata]; // object -> Array 
      const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join("");
    res.write(realTimeData);
   })
   .on('end', (err) => {
     if (err) return console.log('connection closed due to errors', err);
    res.end(err);
   });
}
});
server.listen(3000, "127.0.0.1");