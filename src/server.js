const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const cors = require("cors");

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
  

  var obj = {id:1,text:"Data added successfully"};
  app.get('/data', (req, res) => {
    res.send([{
    "Product": "Mobile Phones",
    "Company": "Xiaomi",
    "Price": "8000",
    "Created": "12-10-2019"
    }]);
    });
  
    app.post('/post', (req, res) => { 
     // res.send(JSON.stringify(obj.text));
      //console.log(obj.text);
      console.log(req.body);
      res.send(JSON.stringify(req.body));


    //   res.status(200).json({
    //     status: 'succes',
    //     data: req.body,
    //   })

      //const post = req.body;
      //res.send(req.body);
      //console.log("Post received " ,post);
      //res.send(req.body);
  });