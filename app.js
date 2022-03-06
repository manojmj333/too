const express = require("express");
const https = require("https")
const app= express();

app.use(express.urlencoded({extended:true}))
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")

})

app.post("/",function(req,res){
  const appId="1cdd0c873ec39f16a6992a73362ea303"
  const cityname= req.body.CityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+appId+"&units=metric#"
  https.get(url,function(response){
  console.log(response.statusCode);
   
 
  response.on("data",function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp;
    const des= weatherData.weather[0].description;
    const icon= weatherData.weather[0].icon;
    const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png"

//     res.write("<html><h3> The weather is "+ des+ "</h3></html>")
//     res.write("<h1> The temperature in " + cityname+" is "+ temp + " degree celsius"+"</h1>")
//     res.write("<img src="+imageURL+">")

    res.send(`<!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <meta name="description" content="">
              <meta name="author" content="">
              <title>WeatherNow - Check the current Weather in your City</title>
              <!-- Bootstrap core CSS -->
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
              <!-- Custom styles for this template -->
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap" rel="stylesheet">
              <link href="css/style.css" rel="stylesheet">
            </head>
            <body>
            <h3> The weather is ${des}</h3>
            <img src="${imageURL}"/>
            </body></html>`);
  })
  
  });
  

});

app.listen(3000,function(){
  console.log("Server running on port 3000..")
})
