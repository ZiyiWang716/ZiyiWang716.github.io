var loadPhoto = function(event) {
    var image = document.getElementById('photoOutput');
    image.src = URL.createObjectURL(event.target.files[0]);
};

function ttext1Change() {
    var x = document.getElementById("mytext1");
    var defaultVal = x.defaultValue;
    var currentVal = x.value;
    
    
      document.getElementById("ttext1").innerHTML = currentVal
    
  }

  function ttext3Change() {
    var x = document.getElementById("mytext3");
    var defaultVal = x.defaultValue;
    var currentVal = x.value;
    
    
      document.getElementById("text3").innerHTML = currentVal
    
  }
function changeTextColor(){
  var e = document.getElementById("colorChoice");
    var result = e.options[e.selectedIndex].value;
    document.getElementById("ttext1").style.color = result
    document.getElementById("ttext3").style.color= result;
}

function changeFilter(){
    var e = document.getElementById("filterChoice");
      var result = e.options[e.selectedIndex].value;
      document.getElementById("photoOutput").style.filter = result
  }