var express = require('express');
var app = express();
var swig = require('swig');

swig.setDefaults({ cache: false });

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use('/js',express.static('static'));

app.get('/autoinit',function(req,res){
  res.send(swig.compileFile('autoinit.html')());
});
app.get('/jsinit',function(req,res){
  res.send(swig.compileFile('jsinit.html')());
});


app.get('/tpf-loader.min.js',function(req,res){
  var tpl = swig.compileFile('./static/movu-widget.js');
  console.log(tpl);
  var jsOut = tpl({});
  res.setHeader('content-type', 'text/javascript');
  res.send(jsOut);
});
var server = app.listen(3002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});