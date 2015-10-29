document.getElementById('getIssues').addEventListener("click", function(){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if (req.readyState === 4 && req.status === 200){
      console.log("hello!");
      console.log(req.responseText);
    }
  };
  req.open("GET", "/getIssues");
  req.send();
});
