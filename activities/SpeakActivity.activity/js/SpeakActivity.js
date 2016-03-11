var SpeakActivity = (function() {
	
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');

	var radiusEye = Math.min(windowWidth,windowHeight)/7;
	var radiusEyeball = Math.min(windowWidth,windowHeight)/24;
	var eyePos1 = {x:windowWidth*0.95/3-radiusEye+windowHeight/20, y:windowHeight/3-radiusEye};
	var eyePos2 = {x:windowWidth*1.75/3-radiusEye+windowHeight/20, y:windowHeight/3-radiusEye};
	var mouthStart = {x:windowWidth*0.75/3,y:windowHeight*1.5/3.0};
	var mouthEnd = {x:windowWidth*1.65/3,y:windowHeight*1.5/3.0};

	// Detect if the browser is IE or not
	var IE = document.all?true:false
	var mouseX,mouseY;

	function init(){
		var speech = Speech();
		speech.init();
		// If not IE, setup mouse for capture
		if (!IE){
			document.captureEvents(Event.MOUSEMOVE)
		}
		var FPS = 30;
		setInterval(function() {
		  updateCanvas();
		}, 1000/FPS);
	}

	document.onmousemove = function(e){
	  if (IE) { // grab the x-y pos.s if browser is IE
	    tempX = event.clientX + document.body.scrollLeft
	    tempY = event.clientY + document.body.scrollTop
	  } else {  // grab the x-y pos.s if browser is NS
	    tempX = e.pageX
	    tempY = e.pageY
	  }  
	  // catch possible negative values in NS4
	  if (tempX < 0){tempX = 0}
	  if (tempY < 0){tempY = 0}  
	  // show the position values in the form named Show
	  // in the text fields named MouseX and MouseY
	  mouseX = tempX;
	  mouseY = tempY;
	}

	function drawEyes(){
		ctx.beginPath();
		ctx.fillStyle="#000000";
		ctx.arc(eyePos1.x,eyePos1.y,radiusEye*1.05,0,2*Math.PI);
		ctx.fill();
		ctx.arc(eyePos2.x,eyePos2.y,radiusEye*1.05,0,2*Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle="#FFFFFF";
		ctx.arc(eyePos1.x,eyePos1.y,radiusEye,0,2*Math.PI);
		ctx.fill();
		ctx.arc(eyePos2.x,eyePos2.y,radiusEye,0,2*Math.PI);
		ctx.fill();
	}

	function getEyeballOffset(eye){ //eye=1 for the first eye and eye=2 for the second eye
		var offsetX,offsetY;
		if(eye==1){
			offsetX = (mouseX - 0.45*windowWidth);
			offsetY = (mouseY - 0.45*windowHeight)*1.2;
		}
		else{
			offsetX = (mouseX - 0.58*windowWidth);
			offsetY = (mouseY - 0.45*windowHeight)*1.2;
		}
		if(isNaN(offsetX))
			offsetX = 0;
		if(isNaN(offsetY))
			offsetY = 0;
		var xMult=1,yMult=1;
		if(offsetX < 0){
			xMult = -1;
		}
		if(offsetY < 0){
			yMult = -1;
		}
		var angle = Math.atan(Math.abs(offsetY/offsetX));
		var dist = 12*radiusEye*((offsetX*offsetX + offsetY*offsetY)/(1200*1200+800*800));
		return {x:xMult*Math.min((radiusEye-radiusEyeball)*Math.cos(angle),dist*Math.cos(angle)),
			y:yMult*Math.min((radiusEye-radiusEyeball)*Math.sin(angle),dist*Math.sin(angle))}
	}

	function drawEyeballs(){
		ctx.beginPath();
		ctx.fillStyle="#000000";
		ctx.arc(eyePos1.x + getEyeballOffset(1).x,eyePos1.y + getEyeballOffset(1).y,radiusEyeball,0,2*Math.PI);
		ctx.fill();
		ctx.arc(eyePos2.x + getEyeballOffset(2).x,eyePos2.y + getEyeballOffset(2).y,radiusEyeball,0,2*Math.PI);
		ctx.fill();
	}

	function drawMouth(){
		ctx.beginPath();
		ctx.moveTo(mouthStart.x,mouthStart.y);
		ctx.lineTo(mouthEnd.x,mouthEnd.y);
		ctx.lineWidth = 10;
		ctx.stroke();
	}

	function updateCanvas(){
		clearCanvas();
		drawEyes();
		drawEyeballs();
		drawMouth();
	}

	function clearCanvas(){
		ctx.clearRect(0, 0, 800, 1200);
	}

	return {
        init: init
    };
});