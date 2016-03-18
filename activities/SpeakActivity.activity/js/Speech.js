var Speech = (function() {

	var answerFinal = "";

	function init(){
		//No Initialization as of now.
		meSpeak.loadConfig("mespeak_config.json");
   		meSpeak.loadVoice("voices/en/en.json");
	}

	function getBotReply(question){
		var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
		aimlInterpreter.loadAIMLFilesIntoArray(['./temp.aiml']);
		answerFinal = "";

		var callback = function(answer, wildCardArray, input){
		    answerFinal = answer.split('.')[0];
		};

		aimlInterpreter.findAnswerInLoadedAIMLFiles(question, callback);
	}

	function playVoice(id) {
      var fname="voices/"+id+".json";
      var text = document.getElementById('userText').value;
      if(document.getElementById('mode').innerHTML=="2"){
	    //After the voice is loaded, playSound callback is called
	    getBotReply(text);
	    setTimeout(function(){
			meSpeak.loadVoice(fname, playSound);
		}, 500);
  	  }
  	  else{
  	  	meSpeak.loadVoice(fname, playSound);
  	  }
    }

    function playSound(){
		var text = document.getElementById('userText').value;
		var pitch = document.getElementById('pitch').innerHTML;
		var speed = document.getElementById('rate').innerHTML;
		if(document.getElementById('mode').innerHTML=="2"){
			text = answerFinal;
			console.log(answerFinal);
		}
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