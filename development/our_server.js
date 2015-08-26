var express = require('express');
var app = express();
var swig = require('swig');

swig.setDefaults({ cache: false });

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use('/js',express.static('static'));
app.get('/swisscom',function(req,res){
  res.send(swig.compileFile('index.html')());
});
app.get('/:lang/api/widget/:customerId',function(req,res){
  var tpl = swig.compileFile('widget.html');
  var jsOut = tpl({ article: { title: 'Swig is fun!' }});
  res.json({"body": jsOut});
});
app.get('/js/movu-widget.js',function(req,res){
  var tpl = swig.compileFile('movu-widget.js');
  var jsOut = tpl({ article: { title: 'Swig is fun!' }});
  res.setHeader('content-type', 'text/javascript');
  res.send(jsOut);
});
var server = app.listen(3002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});