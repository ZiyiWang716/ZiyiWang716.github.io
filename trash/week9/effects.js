    var aText = new Array(
    "DADA WU A O HUH YA ~! YOO AAALAA A UUU OH-EI WOO AW"+
    " ! AHA YOHO O A QUU ~~ YOYOY UU HU AAO O OUA ~", 
    );
    var iSpeed = 100; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText[0].length; // the length of the text array
    var iScrollAt = 20; // start scrolling up at this many lines
     
    var iTextPos = 0; // initialise text position
    var sContents = ''; // initialise contents variable
    var iRow; // initialise current row
    var accomplished = false;
     
    function typewriter()
    {
     sContents =  ' ';
     iRow = Math.max(0, iIndex-iScrollAt);
     var destination = document.getElementById("typedtext");
     
     while ( iRow < iIndex ) {
      sContents += aText[iRow++] + '<br />';
     }
     destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) ;
     if ( iTextPos++ == iArrLength ) {
      popWindow();
      document.body.style.color="rgb(0,0,0)";
      popup.addEventListener('click', flip);
     } else {
      setTimeout("typewriter()", iSpeed);
      //document.body.style.color = generateRandomColor() 

     }
    }
    //adapted the code from https://css-tricks.com/snippets/css/typewriter-effect/

    function generateRandomColor()
{
    var randomColor = '#'+Math.floor(Math.random()*7215).toString(16);
    return randomColor;
}

    typewriter();

    function popWindow()
    {
     
     popup.style.opacity='1';
    }
    let popup=document.getElementById("popup")
    //let card=document.getElementById("card");
    let answer=document.getElementById("answer");
    
    
    
    
    
    function flip(){
        popup.remove();
        answer.style.opacity="1";
        
       
    }
    

 