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
    
    app.post('/post', (req, res) => { 
      console.log(req.body);
      res.send(req.body);

    });
     var procureArray = new Array();
    app.get('/getArray',(req,res)=>{
      console.log("fetching array...");

      fs.readFile('./app/procure.json',  function(err, data) {
        if (err) throw err;
        procureArray = JSON.parse(data);
        console.log(data);
        //procureArray.push(data);
        //console.log("Stringified "+procureArray);
        console.log(procureArray);
        
      });
      res.send(JSON.stringify(procureArray));
    })

     
    //   res.status(200).json({
    //     status: 'succes',
    //     data: req.body,
    //   })

      //const post = req.body;
      //res.send(req.body);
      //console.log("Post received " ,post);
      //res.send(req.body);
 