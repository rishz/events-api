/**
 * Created by rishabhshukla on 06/06/17.
 */

const express = require("express");
const app= express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));

var port = 8100;

router.get('/', function (req, res) {

    res.json({message:'welcome to events-api!'})

});

app.use('/api',router);
app.listen(port);
console.log("Listening on port "+port);
