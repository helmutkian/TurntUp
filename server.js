var express = require('express');
var bodyParser = require('body-parser');
var ytApi = require('./yt-api');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
});

app.post('/search', (req, res) => {
    var q = req.body.q;
    ytApi.search(q).then(result => {
	console.log(result);
	res.send(result);
    });
});

app.listen(3000);
