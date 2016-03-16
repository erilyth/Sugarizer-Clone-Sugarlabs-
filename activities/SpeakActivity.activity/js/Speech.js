var Speech = (function() {

	function init(){
		//No Initialization as of now.
		meSpeak.loadConfig("mespeak_config.json");
   		meSpeak.loadVoice("voices/en/en.json");
	}

	function playVoice(id) {
      var fname="voices/"+id+".json";
      //After the voice is loaded, playSound callback is called
      meSpeak.loadVoice(fname, playSound);
    }

    function playSound(){
		var text = document.getElementById('userText').value;
		var pitch = document.getElementById('pitch').innerHTML;
		var speed = document.getElementById('rate').innerHTML;
		meSpeak.speak(text, {speed: speed, pitch: pitch});
    }

	document.getElementById('speakText').onmousedown = function(e){
		var language = document.getElementById('speaklang').innerHTML;
		playVoice(language);
	}

	return {
        init: init
    };

});