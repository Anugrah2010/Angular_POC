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
    getObj={id:1, text:"Success"};
    app.get('/get', (req,res) => {
        console.log("Sending data...");
        res.send(JSON.stringify(getObj.text));
    })
    //post method 
    app.post('/post', (req, res) => { 
      console.log(req.body);
      res.send(req.body);
    //   var content = JSON.stringify(req.body);
    //   fs.appendFile('./app/procure.json',content ,err => {
    //     if (err) {
    //       console.error(err)
    //       return
    //     }
      
    // });
    // console.log('file updated successfully');
  });
     //Read JSON file method
     var procureArray = new Array();
    app.get('/getArray',(req,res)=>{
      console.log("fetching array...");

      fs.readFile('./app/procure.json',  function(err, data) {
        if (err) throw err;
        procureArray = JSON.parse(data);
        console.log(data);
        console.log(procureArray);
      });
      res.send(JSON.stringify(procureArray));
    })
    
    //Write JSON file method
    app.post('/postUpdate', (req, res) => { 
      console.log(req.body);
      res.send(req.body);

    });
    
