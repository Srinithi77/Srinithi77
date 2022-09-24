"use strict"
const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
//const bodyParser = require('body-parser');
app.use(express.json);

app.get('/', function (req, res) {
    res.send('<h2>POC is running</h2>');
})

app.get('/varshini', function (req, res) {
    res.redirect('https://www.zoho.com');
});

app.post('/post-test', (req, res) => {
    console.log('Got body:', req.body);
	const catalystApp = catalyst.initialize(req);
	getDataFromCatalystDataStore(catalystApp).then(result =>{
		res.send({"msg":result})
	})
});

function getDataFromCatalystDataStore(catalystApp){
	return new Promise((resolve,reject) =>{
		catalystApp.zcql().executeZCQLQuery("select * from examdetails").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});
}

app.all("/",(req,res) => {
	res.status(200).send("I am live and Ready");
});
module.exports=app;
