
console.log("the message is here!");

let theBody, theTxt;

theBody = document.querySelector("body");

let theButton = document.getElementById("myButton");
theTxt = document.querySelector('h2')

theButton.addEventListener('click', myGreatFunction);

theButton.addEventListener('mouseenter', showWarning);

let warning=document.getElementById("warningText");

function showWarning(){
  theBody.style.backgroundColor ='red';
  
  warning.style.opacity='1';


}

function myGreatFunction(){
    console.log("clicked!");
    theBody.style.backgroundImage = "url('stimpy.gif')";
    theTxt.textContent = "You couldn't possibly resist the urge! (press any key)"
    document.getElementById("demo").style.fontSize = "30px"; 
    document.getElementById("demo").style.color = "red";
    document.getElementById("demo").style.backgroundColor = "yellow";   
    theButton.remove(); 
    warning.remove();
  }




var id = null;

document.addEventListener('keydown', myMove);



function myMove(){
    console.log("key pressed");
    var elem = document.getElementById("myAnimation"); 
    elem.style.opacity='1';  
    var pos=0;
    var positive =true;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
    if (pos == 350) {
      pos--; 
      elem.style.top = pos + 'px'; 
      elem.style.left = 3*pos + 'px';
      positive=false;
    } else if (pos > 0 &&pos <350 && positive==true){
      pos++; 
      elem.style.top = pos + 'px'; 
      elem.style.left = 3*pos + 'px'; 
    }
    else if (pos > 0 &&pos <350 && positive==false){
      pos--; 
      elem.style.top = pos + 'px'; 
      elem.style.left = 3*pos + 'px'; 
    }
    else {
      pos++; 
      elem.style.top = pos + 'px'; 
      elem.style.left = 5*pos + 'px'; 
      positive=true;
    }
  }
}
