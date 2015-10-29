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
