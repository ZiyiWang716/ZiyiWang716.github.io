var loadPhoto = function(event) {
    var image = document.getElementById('photoOutput');
    image.src = URL.createObjectURL(event.target.files[0]);
};
var loadPhoto1 = function(event) {
  var image = document.getElementById('photoOutput1');
  image.src = URL.createObjectURL(event.target.files[0]);
};

var loadPhoto2 = function(event) {
  var image = document.getElementById('photoOutput2');
  image.src = URL.createObjectURL(event.target.files[0]);
};

var loadPhoto3 = function(event) {
  var image = document.getElementById('photoOutput3');
  image.src = URL.createObjectURL(event.target.files[0]);
};


function ttext1Change() {
    var x = document.getElementById("mytext1");
    var defaultVal = x.defaultValue;
    var currentVal = x.value;
    
    
      document.getElementById("ttext1").innerHTML = currentVal
    
  }


function ttext1OKChange() {
  var x = document.getElementById("myOKtext1");
  var defaultVal = x.defaultValue;
  var currentVal = x.value;
  
  
    document.getElementById("ttext1OK").innerHTML = currentVal
  
}

function ttext2OKChange() {
  var x = document.getElementById("myOKtext2");
  var defaultVal = x.defaultValue;
  var currentVal = x.value;
  
  
    document.getElementById("ttext2OK").innerHTML = currentVal
  
}
function ttext3OKChange() {
  var x = document.getElementById("myOKtext3");
  var defaultVal = x.defaultValue;
  var currentVal = x.value;
  
  
    document.getElementById("ttext3OK").innerHTML = currentVal
  
}
function ttext4OKChange() {
  var x = document.getElementById("myOKtext4");
  var defaultVal = x.defaultValue;
  var currentVal = x.value;
  
  
    document.getElementById("ttext4OK").innerHTML = currentVal
  
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

  $( ".stickers" ).draggable({
    containment: ".photoContainer" 
}); 


function changePrincess1(){
    var e = document.getElementById("princess1Choice");
      var result = e.options[e.selectedIndex].value;
      document.getElementById("princess1").src = result
  }

  function changeLogo(){
    var e = document.getElementById("logoChoice");
      var result = e.options[e.selectedIndex].value;
      document.getElementById("okLogo").src = result
  }

  function changePrincess2(){
    var e = document.getElementById("princess2Choice");
      var result = e.options[e.selectedIndex].value;
      document.getElementById("princess2").src = result
  }

  $(function() {
    var body = $('#starshine'),
        template = $('.template.shine'),
        stars =  500,
        sparkle = 20;
    
      
    var size = 'small';
    var createStar = function() {
      template.clone().removeAttr('id').css({
        top: (Math.random() * 100) + '%',
        left: (Math.random() * 100) + '%',
        webkitAnimationDelay: (Math.random() * sparkle) + 's',
        mozAnimationDelay: (Math.random() * sparkle) + 's'
      }).addClass(size).appendTo(body);
    };
   
    for(var i = 0; i < stars; i++) {
      if(i % 2 === 0) {
        size = 'small';
      } else if(i % 3 === 0) {
        size = 'medium';
      } else {
        size = 'large';
      }
      
      createStar();
    }
  });

  function changeNewsColor(){
    var e = document.getElementById("colorChoiceNews");
      var result = e.options[e.selectedIndex].value;
      document.getElementById("ttext1OK").style.color = result
  }
  
  function changeSubtextsColor(){
    var e = document.getElementById("colorChoiceSubtexts");
      var result = e.options[e.selectedIndex].value;
      document.getElementById("subTexts").style.color = result
  }
  