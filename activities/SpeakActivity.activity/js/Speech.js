var Speech = (function() {

	function init(){
		//No Initialization as of now.
		meSpeak.loadConfig("mespeak_config.json");
   		meSpeak.loadVoice("voices/en/en.json");
	}

	function loadVoice(id) {
      var fname="voices/"+id+".json";
      meSpeak.loadVoice(fname, voiceLoaded);
    }

	document.getElementById('speakText').onmousedown = function(e){
		speaks();
	}

	function speaks(){
		var text = document.getElementById('userText').value;
		var pitch = document.getElementById('pitch').innerHTML;
		var speed = document.getElementById('rate').innerHTML;
		meSpeak.speak(text, {speed: speed, pitch: pitch});
	}

	return {
        init: init
    };

});