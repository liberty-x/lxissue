document.getElementById('getIssues').addEventListener("click", function() {
  if (document.cookie === "") {
    document.getElementById('pleaseLogin').innerHTML = 'Please Login';
  } else {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        var issues = JSON.parse(req.responseText);
        issues.map(appendToHTML);
      }
    };
    req.open("GET", "/getIssues");
    req.send();
  }
});

function gitterPost(obj){
  var button = document.getElementById(obj.issueId);
  button.addEventListener('click', function(e){
    var request = new XMLHttpRequest();
      e.preventDefault();
      request.onreadystatechange = function(){
        if (request.readyState === 4 && request.status === 200) {
          if (request.responseText === 'OK'){
            button.parentNode.removeChild(button);
          }
        }
      };
      request.open("POST", "/gitter");
      request.send(JSON.stringify(obj));
  });
}

function appendToHTML(value){
  var obj = {
    issueId: value.id,
    url: value.url,
    user: value.user
  };
  var node = document.createElement("div");
  var link = document.createElement("a");
  var button = document.createElement("button");
  link.setAttribute("href", value.url);
  button.setAttribute("id", obj.issueId);
  var url = node.appendChild(link);
  url.innerHTML = value.title;
  node.appendChild(button);
  document.getElementById('issues').appendChild(node);
  gitterPost(obj);
}
