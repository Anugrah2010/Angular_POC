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

  //get methods
    getObj={id:1, text:"Success"};
    app.get('/get', (req,res) => {
        console.log("Sending data...");
        res.send(JSON.stringify(getObj.text));
    })

     //procure search get method
    var procureArray = new Array();
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
    var obj = {
      table: []
    };
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
    
    //Write JSON file method
    app.post('/postUpdate', (req, res) => { 
      console.log(req.body);
      res.send(req.body);

    });
