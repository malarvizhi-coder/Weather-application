const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){

    const query = req.body.cityName;
    const units = "metric";
    const appid = "9c9d1d5529ea18f58921c80012b2d7f5";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+",&appid=9c9d1d5529ea18f58921c80012b2d7f5&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"

        res.write("<html>");
        res.write("<h2>The temperature in "+query+" is "+temperature+ " degrees Celsius.<h2> \n");
        res.write("<h3>The weather is currently "+description+ "...<h3> \n");
        res.write("<img src="+imageURL+"> \n");
        res.write("</html>");

        res.send();
    })
    })
    
})



app.listen(3000, function(){
    console.log("runningin port 3000");
})