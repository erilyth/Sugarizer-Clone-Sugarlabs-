var Speech = (function() {

	function init(){
		//No Initialization as of now.
	}

	document.getElementById('speakText').onmousedown = function(e){
		speaks();
	}

	function speaks(){
		var text = document.getElementById('userText').value;
		speak(text, { amplitude: 100, wordgap: 0, pitch: 50, speed: 150 });
	}

	return {
        init: init
    };

});