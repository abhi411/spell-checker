const express = require('express')
const fs = require('fs')
var bodyParser = require('body-parser')
const app = express()
var path = require('path');
var spell = require("./middleware")
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'views')));

const port = 3000
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/spellCheck', jsonParser, async(req, res) => {
    console.log("res",req.body)
    var data = req.body.string.split(" ")
    let rep = await spell.checkSpell(data,req.body.lang)
    console.log("data",data,rep)
    res.send(rep)
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
})