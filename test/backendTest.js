var shot = require("shot");
var test = require("tape");
var router = require("./../js/router.js");
var app = require("./../js/app.js");

testUrl("/", 200);
testUrl("/public/main.css", 200);
testUrl("/public/frontend.js", 200);
testUrl("/login", 200);
testUrl("/duckquack", 404);
// Won't work without token
// testUrl("/gitter", 200);

// TODO
// test('does data chunking function work?', function(t){
//     var object = {};
//     var callback = function(body){};
//     var actual = app.parseBody(object, callback);
//     var expected = 'blah';
//     t.equal(actual, expected, "test passed!");
//     t.end();
// });

// TODO
// test('does gitter api respond correctly?', function(t){
//   var actual = app.gitterPost();
//   var expected = {"error":"Unauthorized"};
//   t.equal(actual, expected, "test passed!");
//   t.end();
// });

function testUrl(url, statusCode){
  test("check " + url + " is " + statusCode, function(t){
    var request = {
      method: "GET",
      url: url
    };

    shot.inject(router, request, function(res){
      var actual = res.statusCode;
      var expected = statusCode;
      t.equal(actual, expected, "test passed");
      t.end();
    });
  });
}


// test("testing getIssues endpoint", function(t){
//   var request = {
//     method: "GET",
//     url: "/getIssues"
//   };
//
//   shot.inject(router, request, function(res){
//     var actual = res.statusCode;
//     var expected = 200;
//     t.equal(actual, expected, "test passed");
//     t.end();
//   });
// });
