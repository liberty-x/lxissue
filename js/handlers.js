var handlers = module.exports = {};
var app = require('./app.js');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/../public/index.html');

var headers = {"content-type" : "text/html"};

handlers.home = function(req,res){
  res.writeHead(200, headers);
  res.end(index);
};

handlers.file = function(req,res){
  var file = fs.readFileSync(__dirname + '/../' + req.url);
  var ext = (req.url).split('.')[1];
  res.writeHead(200, {"content-type" : "text/" + ext});
  res.end(file);
};

handlers.notFound = function(req,res){
  res.writeHead(404, headers);
  res.end("Can't help you there, chum!");
};
