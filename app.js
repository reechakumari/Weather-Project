const { response } = require("express");
const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=9a122572d58d0df5b4a0422bdf0ee763";

    https.get(url, function(response){
        // console.log(response);
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.current.temp
            const humidity = weatherData.current.humidity
            const main = weatherData.current.weather[0].main
            const des = weatherData.current.weather[0].description
            const icon = weatherData.current.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

            // console.log("Temprature is "+ temp);
            // console.log("Humidity is "+ humidity);
            // console.log("Main is "+ main);
            // console.log("Description is "+des);

            res.write("<h1>Temperature is "+ temp +"</h1>");
            res.write("<h1>Humidity is "+ humidity+"</h1>");
            res.write("<h1>Main is "+ main+"</h1>");
            res.write("<h1>Description is "+ des+"</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send()

        })
    })
})

 


app.listen(3000, function(){
    console.log("Server is running on the port 3000.");
})