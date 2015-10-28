var app = module.exports = {};
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

app.gitterPost = function(){
  console.log('gitterPost function');
var options = {
  host: 'api.gitter.im',
  path: '/v1/rooms/RachelBLondon/libert-x/chatMessage',
  headers: {
    // These weren't strings in documentation
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // find out what token is
    'Authorization' : 'Bearer {{token}}'
  },
  method: 'POST'
};
var body = {
  "text" : "LX RIDDLE!"
};
var gitterReq = https.request(options, function(res){
  app.parseBody(res, function(body){
    console.log('<<<app.parseBody>>>');
    console.log(body);
  });
});
gitterReq.write(JSON.stringify(body));
gitterReq.end();
console.log('Body >>>' + body);
};
