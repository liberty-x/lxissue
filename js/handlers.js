var handlers = module.exports = {};
var app = require('./app.js');
var fs = require('fs');
var env = require('env2')('./config.env');
var querystring = require('querystring');
var index = fs.readFileSync(__dirname + '/../public/index.html');

var headers = {"content-type" : "text/html"};

handlers.home = function(req,res){
  res.writeHead(200, headers);
  res.write("<div class='link'><a id='auth' href=https://github.com/login/oauth/authorize?client_id=" + process.env.client_id + "&scope=repo> Login with Github</a></div>");
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

handlers.login = function(req,res){
  app.swapCodeForToken(req,res, function(accessToken){
    res.writeHead(200,{ "Set-Cookie" : 'access=' + accessToken});
    res.end(index);
  });
};

handlers.gitter = function(req,res){
  app.gitterPost(req,res, function(){
    res.writeHead(200, headers);
    res.end('OK');
  });
};

handlers.getIssues = function(req,res){
  app.getIssues(req,res, function(listOfIssues){
    res.writeHead(200, headers);
    res.end(JSON.stringify(listOfIssues));
  });
};
