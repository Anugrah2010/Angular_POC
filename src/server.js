const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: false
}));
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // res.setHeader(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept"
    // );
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PATCH, DELETE, OPTIONS"
    // );
    next();
  });
  
  // methods start from here 
  var obj = {
    table: []
  };
  var registerArray = new Array();
  var procureArray = new Array();

  //get methods
  //get 
    app.get('/getRegisterArray', (req,res) => {
      fs.readFile('./app/register.json', 'utf8',  function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log(obj);
        registerArray = obj.table;
        console.log(registerArray);
      });
      res.send(JSON.stringify(registerArray));

    })

     //procure search get method
    app.get('/getProcureArray',(req,res)=>{
      console.log("fetching array...");

          fs.readFile('./app/procure.json', 'utf8',  function(err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            console.log(obj);
            procureArray = obj.table;
          });
          res.send(JSON.stringify(procureArray));
          console.log("array fetched");
        });

      var request = require("request");
      var lang = new Array();
      var resp ;
    app.get('/getCountries', (req, res) => {

      var options = {
        method: 'GET',
        url: 'https://restcountries-v1.p.rapidapi.com/all',
        headers: {
          'x-rapidapi-host': 'restcountries-v1.p.rapidapi.com',
          'x-rapidapi-key': '2c07c56fffmsh612916139536f33p1ff344jsne84e95cab4a3'
        }
      };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
          resp = JSON.parse(body);
        
         
        
        console.log(resp);
      });
        res.send(JSON.stringify(resp));
    });

    //post methods
    // post procure form data
    app.post('/post', (req, res) => {
      console.log(req.body);
      
      fs.readFile('./app/procure.json', 'utf8', function(err, data) {
        if (err) throw err;
         obj = JSON.parse(data);
         obj.table.push(req.body);
         json = JSON.stringify(obj);
         fs.writeFile('./app/procure.json', json, 'utf8', function(err, data){
            if(err) throw err;   
            console.log("Data added successfully");
              console.log(data);
          });
      });
    });
    
    // post register form data 
    app.post('/postRegisterUrl', (req, res) => { 
      fs.readFile('./app/register.json', 'utf8', function(err, data) {
        if (err) throw err;
         obj = JSON.parse(data);
         obj.table.push(req.body);
         json = JSON.stringify(obj);
        fs.writeFile('./app/register.json', json, 'utf8', function(err, data){
            if(err) throw err;   
            console.log("Data added successfully");
              console.log(data);
        });
      });
    });

    //delete methods
    //delete procure array element
    app.post('/deleteProcureEntry',(req,res) => {
      fs.readFile('./app/procure.json', 'utf8', function(err, data) {
        if (err) throw err;
         obj = JSON.parse(data);
         obj.table.splice(0, obj.table.length);
         obj.table = req.body;
         json = JSON.stringify(obj);

         console.log('This is the delete request body'+req.body);
         console.log(json);
         fs.writeFile('./app/procure.json', json, 'utf8', function(err, data){
           if(err) throw err;   
           console.log("Data deleted successfully");
             console.log(data);
        });
    });
  });
