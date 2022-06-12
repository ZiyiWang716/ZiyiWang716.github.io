
var figures = document.getElementsByTagName('figure');
for(var i = 0; i < figures.length; i++)
{
    figures[i].classList.add("one-third")
}

var footer=document.getElementsByTagName('footer');
footer[0].addEventListener('click', function handleClick(event) {
   footer[0].remove();
  });

var fig5=figures[4];
fig5.addEventListener('dblclick',function(e){
    fig5.style.visibility="hidden";
});

var fig1 = figures[0];
var cap1=fig1.children[1];
var cap1OriginalStyle=cap1.style.fontFamily;

cap1.addEventListener('mouseenter',function(e){
    cap1.style.fontFamily="Cursive";
});

cap1.addEventListener('mouseout',function(e){
    cap1.style.fontFamily="cap1OriginalStyle";
});

cap1.tabIndex="0"
cap1.addEventListener('focus',function(e){
    cap1.style.fontFamily="Cursive";
    console.log(activeElem.interHTML)
});

cap1.addEventListener('blur',function(e){
    cap1.style.fontFamily="cap1OriginalStyle";
});

