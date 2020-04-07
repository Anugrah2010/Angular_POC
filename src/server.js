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
