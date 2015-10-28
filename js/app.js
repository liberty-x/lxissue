var app = module.exports = {};
var querystring = require("querystring");
var https = require('https');

app.parseBody = function(object, callback) {
  var body = "";
  object.on('data', function(data) {
    body += data;
  });
  object.on('end', function() {
    callback(body)
  });
  object.on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};

app.swapCodeForToken = function (req,res){
  var code = (req.url).split('code=')[1];
  var options = {
    hostname: 'github.com',
    path: '/login/oauth/access_token',
    method : 'POST'
  };
  var postData = querystring.stringify({
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
    code: code
  });
  var githubReq = https.request(options, function(responseFromGithub){
    responseFromGithub.on('data', function(chunk){
      var accessToken = chunk.toString().split('=')[1].split('&')[0];
      res.writeHead(200,{ "Set-Cookie" : 'access=' + accessToken});
      res.end('logged in');
    })
  }).end(postData);
}
