var button = document.getElementById('nuke');
// will need to change for each unique button

var request = new XMLHttpRequest();

button.addEventListener('click', function(e){
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
