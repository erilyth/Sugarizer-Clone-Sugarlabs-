var Speech = (function() {

	var answerFinal = "";

	function init(){
		//No Initialization as of now.
		meSpeak.loadConfig("mespeak_config.json");
   		meSpeak.loadVoice("voices/en/en.json");
	}

	function getBotReply(question){
		var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
		aimlInterpreter.loadAIMLFilesIntoArray([
			'js/alice/1.aiml',
			'js/alice/2.aiml',
			'js/alice/3.aiml',
			'js/alice/4.aiml',
			'js/alice/5.aiml',
			'js/alice/6.aiml',
			'js/alice/8.aiml',
			'js/alice/9.aiml',
			'js/alice/A.aiml',
			'js/alice/B.aiml',
			'js/alice/C.aiml',
			'js/alice/D.aiml',
			'js/alice/E.aiml',
			'js/alice/F.aiml',
			'js/alice/G.aiml',
			'js/alice/H.aiml',
			'js/alice/I.aiml',
			'js/alice/J.aiml',
			'js/alice/K.aiml',
			'js/alice/L.aiml',
			'js/alice/M.aiml',
			'js/alice/N.aiml',
			'js/alice/O.aiml',
			'js/alice/P.aiml',
			'js/alice/Q.aiml',
			'js/alice/R.aiml',
			'js/alice/S.aiml',
			'js/alice/T.aiml',
			'js/alice/U.aiml',
			'js/alice/V.aiml',
			'js/alice/W.aiml',
			'js/alice/X.aiml',
			'js/alice/Y.aiml',
			'js/alice/Z.aiml',
			'js/alice/star.aiml',
			'js/alice/under.aiml']);
		answerFinal = "";

		var callback = function(answer, wildCardArray, input){
			if(answer == null){
				answer = "";
			}
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
		}, 3000);
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