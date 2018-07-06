var http = require("http");
var weather = require("weather-js")
var inquirer = require("inquirer")
var PORT1 = 7000;
var PORT2 = 7500;
var counter = 1

inquirer.prompt([
    {
        type: "input",
        message: "enter a city name to find it's current weather",
        name: "city1"
    },
    {
        type: "input",
        message: "enter another city name to find it's current weather",
        name: "city2"
    }
]).then(function(res){
    function handleRequest1(request, response) {
    

        weather.find({search: res.city1, degreeType: 'F'}, function(err, result) {
            if(err) console.log(err);
            var content = "<h1>" + result[0].location.name + " : " + result[0].current.temperature + " : " + "<img src= "+result[0].current.imageUrl + "></h1>"
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(content, "utf-8");
          });
    }
    function handleRequest2(request, response) {
        
        weather.find({search: res.city2, degreeType: 'F'}, function(err, result) {
            if(err) console.log(err);
            var content = "<h1>" + result[0].location.name +  " : " + result[0].current.temperature + " : " + "<img src= "+result[0].current.imageUrl + "></h1>"
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(content, "utf-8");
          });
        
    }
    
    var server1 = http.createServer(handleRequest1);
    var server2 = http.createServer(handleRequest2);
    server1.listen(PORT1, function() {
      console.log("Server listening on: http://localhost:" + PORT1);
    });
    server2.listen(PORT2, function() {
        console.log("Server listening on: http://localhost:" + PORT2);
      });
    
})








  