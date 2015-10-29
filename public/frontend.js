document.getElementById('getIssues').addEventListener("click", function(){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if (req.readyState === 4 && req.status === 200){
      console.log(req.responseText);
      var issues = JSON.parse(req.responseText);
      console.log(issues);
      issues.map(appendToHTML);
    }
  };
  req.open("GET", "/getIssues");
  req.send();
});

var button = document.getElementById('nuke');
// will need to change for each unique button
button.addEventListener('click', function(e){
  var request = new XMLHttpRequest();
    e.preventDefault();
    console.log('>>> button');
    request.onreadystatechange = function(){
      if (request.readyState === 4 && request.status === 200) {
          console.log(request.responseText);
      }
    };
    request.open("POST", "/gitter");
    request.send();
});

function appendToHTML(value){
  var node = document.createElement("div");
  var textnode = document.createTextNode(value.title);
  node.appendChild(textnode);
  document.getElementById('issues').appendChild(node);
}
