let ready, one, two, three, audio, obr, i, timerflag,readyflag;
readyflag = true;
if(readyflag){ 
  readyflag = false;
document.querySelector("html").onclick = function () {
  obr = 60;
  i = 1;
  timerflag = true;
  ready = document.querySelector(".ready");
  ready.classList.remove("opacity");

  one = document.querySelector(".one");
  two = document.querySelector(".two");
  three = document.querySelector(".three");

  setTimeout(function () {
    three.classList.remove("opacity");
  }, 500);
  setTimeout(function () {
    three.classList.add("opacity");
    two.classList.remove("opacity");
  }, 1500);
  setTimeout(function () {
    two.classList.add("opacity");
    one.classList.remove("opacity");
  }, 2500);
  setTimeout(function () {
    ready.classList.add("opacity");
    one.classList.add("opacity");
    two.classList.add("opacity");
    three.classList.add("opacity");
  }, 2800);
};
  //End ready alert----------------------

  setTimeout(function () {
    timer();
    function timer() {
      document.querySelector(".timer").innerText = obr;
      obr--;
      if (timerflag) {
        setTimeout(timer, 1000);
      }
      if (i % 2 == 1 && obr == 0) {
        document.querySelector("body").style.background = "white";
        setTimeout(function () {
          document.querySelector("body").style.background = "#212121";
        }, 1500);
        setTimeout(function () {
          i++;
          obr = 10;
        }, 1460);
      }
      if (i % 2 == 0 && obr == 0) {
        document.querySelector("body").style.background = "white";
        setTimeout(function () {
          document.querySelector("body").style.background = "#212121";
        }, 1500);
        setTimeout(function () {
          i++;
          obr = 60;
        }, 1460);
      }
    }
    heart();
    function heart() {
      let recognizer = new webkitSpeechRecognition();
      recognizer.interimResults = true;
      recognizer.lang = "ru-Ru";
      let synth = window.speechSynthesis;
      let payse = new SpeechSynthesisUtterance("Поставлено на паузу");
      let play = new SpeechSynthesisUtterance("Продолжили");
      let gopnick = new SpeechSynthesisUtterance("ааааааааууууууффф");
      recognizer.onresult = function (event) {
        var result = event.results[event.resultIndex];
        if (result.isFinal) {
          if (result[0].transcript == "пауза") {
            timerflag = false;
            synth.speak(payse);
          } if(result[0].transcript == "продолжить") {
            timerflag = true;
            timer();
            synth.speak(play);
          }else{
            synth.speak(gopnick);
          }
        }
      };
      recognizer.start();
      setTimeout(heart, 2000);
    }
  }, 3000);
};
