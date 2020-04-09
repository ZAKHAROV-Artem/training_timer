let ready, one, two, three, audio, obr, i, timerflag;
document.querySelector("html").onclick = function () {
  obr = 5;
  i = 1;
  timerflag = true;

  //ready alert------------------------------------------------------------------------

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


  //----------------------------------------------------------

  //create recognizer  and speechSynthesisUtterance-------------------------------

  let synth = window.speechSynthesis;
  let payse = new SpeechSynthesisUtterance("Поставлено на паузу");
  let play = new SpeechSynthesisUtterance("Продолжили");
  let relax = new SpeechSynthesisUtterance("Отдых");
  let work = new SpeechSynthesisUtterance("Начали");

  //------------------------------------------------------------------------------

  //timer-------------------------------------------------------------------------

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
        synth.speak(relax);
        setTimeout(function () {
          document.querySelector("body").style.background = "#212121";
        }, 1500);
          i++;
          obr = 10;
      }
      if (i % 2 == 0 && obr == 0) {
        document.querySelector("body").style.background = "white";
        synth.speak(work);
        setTimeout(function () {
          document.querySelector("body").style.background = "#212121";
        }, 1500);
          i++;
          obr = 60;
      }
    }

//------------------------------------------------------------------------------------------

//heart func -------------------------------------------------------------------------------
    heart();
    function heart() {
      let recognizer = new webkitSpeechRecognition();
      recognizer.interimResults = true;
      recognizer.lang = "ru-Ru";
      recognizer.start();
      recognizer.onresult = function (event) {
       
        var result = event.results[event.resultIndex];
      
        if (result.isFinal) {
          if (result[0].transcript == "пауза") {
            timerflag = false;
            synth.speak(payse);
          }
          if (result[0].transcript == "продолжить") {
            timerflag = true;
            timer();
            synth.speak(play);
          }
        }
      };
      setTimeout(heart, 6000);
    }
  }, 3000);
};
//---------------------------------------------------------------------------
      
