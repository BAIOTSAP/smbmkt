/** App Initial Configuration **/

/* Load NodeJS Modules */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
app.use(express.static('public'));

console.log("Allowing CORS...")
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//To Support body on post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Load Local Modules */
const sl = require('./modules/erp/b1');
const byd = require('./modules/erp/byd');
const leo = require('./modules/leo');
const biz = require('./modules/biz');

//create Redis Client
var output = {};

// Root path to retrieve Index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/Items', function (req, res) {
    console.log("REQUEST: List Items")
    biz.GetItems({}, function (error, response) {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(response)
    })
});

app.get('/SalesOrders', function (req, res) {
    console.log("REQUEST: List Sales Orders")
    biz.GetSalesOrders({}, function (error, response) {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(response)
    })
});

var port = process.env.PORT || 30000
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

