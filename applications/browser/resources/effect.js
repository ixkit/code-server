const getAnimateCanvas =()=>{
    const mycanvas = document.getElementById('codeStreamCanvas');
    return mycanvas ;
}
const animate_coding_effect =()=> { 

    var H = window.innerHeight;
    var W = window.innerWidth;
    var mycanvas = getAnimateCanvas()
    var ctx = mycanvas.getContext('2d');

    mycanvas.height = H;
    mycanvas.width = W;

    var fontsize = 18;
    var text = [];
    var lie = Math.floor(W / fontsize);
    var str = '01'
    for (var i = 0; i < lie; i++) {
      text.push(0);
    }
    ctx.font = fontsize + 'px ';

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = randColor();
      for (var i = 0; i < lie; i++) {
        var index = Math.floor(Math.random() * str.length);
        var x = Math.floor(fontsize * i)
        var y = text[i] * fontsize
        ctx.fillText(str[index], x, y);
        if (y > H && Math.random() > 0.99) {
          text[i] = 0
        }
        text[i]++;
      }
    }

    function randColor() {
      var r = Math.ceil(Math.random() * 155) + 100;
      var g = Math.ceil(Math.random() * 155) + 100;
      var b = Math.ceil(Math.random() * 155) + 100;
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
   
    var timer = setInterval(function() {
      draw();
    }, 1000 / 30)
}
const listenWindowSize = ()=>{
    window.οnresize=function(){ 
      fitScren();
    }
     
}  
const fitScren =()=>{
  var mycanvas = document.getElementById('mycanvas');
  if (!mycanvas) return ; 
  var H = window.innerHeight;
  var W = window.innerWidth; 
  mycanvas.height = H;
  mycanvas.width = W;
}
const startFitScreen =()=>{
  let counter = 0;
  let intervalId = setInterval(() => {
      counter++;
      fitScren();
      if (counter >= 5) {
          clearInterval(intervalId);
          
      }
  }, 1000);

}

window.onload=function(){
    //console.log('🚀 effect.js,window.onload')
    if (getAnimateCanvas()){
      startFitScreen();
        animate_coding_effect()
        listenWindowSize();
    }
} 
 
//console.log('🚀 effect.js')