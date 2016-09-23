window.onload=function(){
    var d=document;
    d.attachEvent? d.attachEvent("onmousemove",bb) : d.addEventListener("mousemove",bb,false)
}
function bb(oEvent){
    var t=document.getElementById("a");
    var o=oEvent||window.event;
    t.style.left=o.clientX-t.offsetWidth/2+'px';
    t.style.top=o.clientY-t.offsetHeight/2+'px';
}