var Speech = (function() {

	function init(){
		//No Initialization as of now.
	}

	document.getElementById('speakText').onmousedown = function(e){
		speaks();
	}

	function speaks(){
		var text = document.getElementById('userText').value;
		var pitch = document.getElementById('pitch').innerHTML;
		var speed = document.getElementById('rate').innerHTML;
		speak(text, { amplitude: 100, wordgap: 0, pitch: pitch, speed: speed });
	}

	return {
        init: init
    };

});