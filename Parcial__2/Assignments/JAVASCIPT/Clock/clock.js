function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  }
  
  function drawFace(ctx, radius) {
    var grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    grad= ctx.createRadialGradient(0, 0, radius * 0.9, 0, 0, radius);
    grad.addColorStop(0, "black");
    grad.addColorStop(0.4, "gray");
    grad.addColorStop(0.8, "lightgray");
    grad.addColorStop(1, "white"); 

    ctx.lineWidth = radius * 0.07;
    ctx.strokeStyle = grad;
    ctx.stroke();

    var centertinycircle = radius * 0.075;
    ctx.beginPath();
    ctx.arc(0, 0, centertinycircle, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();                          
  }
  
  function drawNumbers(ctx, radius) {
    var ang;
    var num = 1;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";

    for(var num = 1; num <= 12; num++){
    var ang = (num * Math.PI) / 6;

    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);

    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
    }
  }
  
  function drawTime(ctx, radius) {

    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    var houra = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(360*60));
    var minutea = (minute*Math.PI/30) + (second*Math.PI/(30*60));
    var seconda = (second*Math.PI/30);

    //hour
    hour = hour % 12;
    drawHand(ctx, houra, radius * 0.5, radius * 0.07);
    //minute
    drawHand(ctx, minutea, radius * 0.8, radius * 0.07);
    // second
    drawHand(ctx, seconda, radius * 0.9, radius * 0.02);
  }
  
  function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }