var app = module.exports = {};
var querystring = require("querystring");
var https = require('https');

app.parseBody = function(object, callback) {
  var body = "";
  object.on('data', function(data) {
    body += data;
  });
  object.on('end', function() {
    callback(body);
  });
  object.on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};

app.swapCodeForToken = function (req,res, callback){
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
  https.request(options, function(responseFromGithub){
    app.parseBody(responseFromGithub, function(body){
      var accessToken = body.toString().split('=')[1].split('&')[0];
      callback(accessToken);
    });
  }).end(postData);
};

app.getIssues = function(req, res, callback){
  var token = (req.headers.cookie).split("=")[1];
  var username;
  app.getUsername(req, res, token, function(username){
    var options = {
              host: 'api.github.com',
              path: '/issues?filter=assigned&state=open',
              method: 'GET',
              headers: {
                  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
                  'Authorization': 'token ' + token
              },
          };
    https.request(options, function(responseFromGithub){
      app.parseBody(responseFromGithub, function(body){
        var listOfIssues = JSON.parse(body).map(matchResults);
        callback(listOfIssues);
      });
    }).end();
  });
};

function matchResults(value){
  return {
      title: value.title,
      user: value.user.login,
      url: value.url.replace("api.","").replace("/repos",""),
      id: value.id
    };
}

app.getUsername = function (req, res, token, callback){
  var options = {
            host: 'api.github.com',
            path: '/user?access_token=' + token,
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
            }
        };
  https.request(options, function(responseFromGithub){
    app.parseBody(responseFromGithub, function(body){
      username = JSON.parse(body).login;
      callback(username);
    });
  }).end();
};

app.gitterPost = function(req, res, callback) {
  //foundersandcoders room id: 5476793bdb8155e6700d889f
  //libertyx room id: 55f6ced50fc9f982beb0a1cd
  var objFromFrontend = app.parseBody(req, function(body){
    var issueMessage = JSON.parse(body);
    sendGitterRequest(issueMessage);
  });

  function sendGitterRequest (issueMessage) {
    var options = {
      host: 'api.gitter.im',
      path: '/v1/rooms/55f6ced50fc9f982beb0a1cd/chatMessages',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer 352a20aa8842b2841080b476d6a4ede2182b36d5'
      },
      method: 'POST'
    };
    var message = {
      "text": " please check issue " + issueMessage.url + " to see if it has been resolved"
      // "text": "@" + issueMessage.user + " please check issue " + gitterURL + " to see if it has been resolved"
    };
    var gitterReq = https.request(options, function(res) {
      app.parseBody(res, function(body) {
      });
    }).end(JSON.stringify(message));
  }
  callback();
};
