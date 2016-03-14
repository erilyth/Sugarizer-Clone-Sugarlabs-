var SpeakActivity = (function() {

	var palette = require("sugar-web/graphics/palette");

	var windowWidth = document.body.offsetWidth;
	var windowHeight = document.body.offsetHeight;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');

	var radiusEye = Math.min(windowWidth,windowHeight)/8;
	var radiusEyeball = Math.min(windowWidth,windowHeight)/30;
	var eyePos = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
	var mouthStart = {x:windowWidth*0.73/3,y:windowHeight*1.5/3.0};
	var mouthEnd = {x:windowWidth*1.6/3,y:windowHeight*1.5/3.0};
	var noOfEyes = 2;

	// Detect if the browser is IE or not
	var IE = document.all?true:false
	var mouseX,mouseY;
	var mouthYdiff = 0.0;
	var mouthDirection = 1;
	var mouthAnimRem = 0;
	var mouthTimeout;

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

	function setEyes(eyes){
		var ratio = (1)/(eyes+2);
		var baseoffset = 0.30*windowWidth/(eyes+1)-windowWidth*0.03;
		var i;
		for(i=1;i<=eyes;i++){
			eyePos[i].x = baseoffset + windowWidth*ratio*i-radiusEye;
			eyePos[i].y = windowHeight/2.9-radiusEye;
		}
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
	  mouseX = (tempX/document.body.offsetWidth)*1480;
	  mouseY = (tempY/document.body.offsetHeight)*1480;
	}

	function drawEyes(){
		var i;
		for(i=1;i<=noOfEyes;i++){
			ctx.beginPath();
			ctx.fillStyle="#000000";
			ctx.arc(eyePos[i].x,eyePos[i].y,radiusEye*1.05,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}
		for(i=1;i<=noOfEyes;i++){
			ctx.beginPath();
			ctx.fillStyle="#FFFFFF";
			ctx.arc(eyePos[i].x,eyePos[i].y,radiusEye,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}
	}

	function getEyeballOffset(eye){ //eye=1 for the first eye and eye=2 for the second eye
		var offsetX,offsetY;
		var baseoffset = 0.30*windowWidth/(noOfEyes+2);
		var ratio = (1)/(noOfEyes+2);
		if(eye==1){
			offsetX = (mouseX - (baseoffset + ratio*1*windowWidth) - radiusEyeball);
			offsetY = (mouseY - 0.45*windowHeight)*1.2;
		}
		else if(eye==2){
			offsetX = (mouseX - (baseoffset + ratio*2*windowWidth) - radiusEyeball);
			offsetY = (mouseY - 0.45*windowHeight)*1.2;
		}
		else if(eye==3){
			offsetX = (mouseX - (baseoffset + ratio*3*windowWidth) - radiusEyeball);
			offsetY = (mouseY - 0.45*windowHeight)*1.2;
		}
		else if(eye==4){
			offsetX = (mouseX - (baseoffset + ratio*4*windowWidth) - radiusEyeball);
			offsetY = (mouseY - 0.45*windowHeight)*1.2;
		}
		else if(eye==5){
			offsetX = (mouseX - (baseoffset + ratio*5*windowWidth) - radiusEyeball);
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
		var i;
		for(i=1;i<=noOfEyes;i++){
			ctx.beginPath();
			ctx.fillStyle="#000000";
			ctx.arc(eyePos[i].x + getEyeballOffset(i).x,eyePos[i].y + getEyeballOffset(i).y,radiusEyeball,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}
	}

	document.getElementById('speakText').onmouseup = function(e){
		moveMouth();
	}

	function animateMouth(){
		mouthAnimRem -= 1;
		console.log('animateMouthcalled');
		if(mouthAnimRem<=0){
			clearInterval(mouthTimeout);
			mouthYdiff = 0;
		}
		if(mouthDirection==1){
			mouthYdiff -= 3;
			if(mouthYdiff<-40){
				mouthDirection = 2;
			}
		}
		else if(mouthDirection==2){
			mouthYdiff += 3;
			if(mouthYdiff>40){
				mouthDirection = 1;
			}
		}
	}

	function moveMouth(){
		var text = document.getElementById('userText').value;
		var words = text.split(" ").length;
		var time = (words/(150+40))*60; //The time taken to speak
		var interval = 0.01;
		if(text != ""){
			mouthAnimRem = time/interval;
			mouthTimeout = setInterval(function(){
				animateMouth();
			},interval*1000);
		}
	}

	function drawMouth(){
		ctx.beginPath();
		ctx.moveTo(mouthStart.x,mouthStart.y);
		ctx.bezierCurveTo(mouthStart.x+100,mouthStart.y+mouthYdiff,mouthEnd.x-100,mouthEnd.y+mouthYdiff,mouthEnd.x,mouthEnd.y);
		ctx.lineWidth = 10;
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		ctx.moveTo(mouthStart.x,mouthStart.y);
		ctx.bezierCurveTo(mouthStart.x+100,mouthStart.y-mouthYdiff,mouthEnd.x-100,mouthEnd.y-mouthYdiff,mouthEnd.x,mouthEnd.y);
		ctx.lineWidth = 10;
		ctx.stroke();
		ctx.closePath();
	}

	function updateCanvas(){
		clearCanvas();
		noOfEyes = parseInt(document.getElementById('numeyes').innerHTML);
		setEyes(noOfEyes);
		drawEyes();
		drawEyeballs();
		drawMouth();
	}

	function clearCanvas(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	return {
        init: init
    };
});