var handlers = module.exports = {
  index: index
};
var app = require('./app.js');
var fs = require('fs');
var env = require('env2')('./config.env');
var querystring = require('querystring');
var index = fs.readFileSync(__dirname + '/../public/index.html');
var issuesHTML = fs.readFileSync(__dirname + '/../public/issues.html');

var headers = {"content-type" : "text/html"};

handlers.home = function(req,res){
  res.writeHead(200, headers);
  res.write("<a id='auth' href=https://github.com/login/oauth/authorize?client_id=" + process.env.client_id + "> Login To Github</a>");
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
    res.end(issuesHTML);
  });

};

handlers.getIssues = function(req,res){
  app.getIssues(req,res, function(issues){
    // res.end(issues)
  });
};
