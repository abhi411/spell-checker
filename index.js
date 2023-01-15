const express = require('express')
const fs = require('fs')
var bodyParser = require('body-parser')
const app = express()
const wakeDyno = require("woke-dyno");
var path = require('path');
var spell = require("./middleware")
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'views')));

const port = process.env.PORT || 3001
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/spellCheck', jsonParser, async(req, res) => {
    var data = req.body.string.split("\n")
    let rep = await spell.checkSpell(data,req.body.lang)
    res.send(rep)
})

app.get('/ads.txt', function(req, resp, next){
res.render('ads.txt')
})
app.get('/', function (req, response, next) {
    fs.readFile('./views/index.html', function (err, html) {
        if (err) throw err;    
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    });
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
wakeDyno("https://correccionortografica.com").start();
})
