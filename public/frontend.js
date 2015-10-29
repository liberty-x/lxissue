document.getElementById('getIssues').addEventListener("click", function(){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if (req.status === 4 && req.statusCode === 200){
      console.log(req.responseText);
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
      if (request.readyState === 4 && request.status === 400) {
          console.log(request.response);
      }
    };
    request.open("POST", "/gitter");
    request.send();
});
