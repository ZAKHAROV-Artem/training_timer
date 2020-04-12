let ready, one, two, three, audio, obr, i, timerflag, persent, time10, time60;
document.querySelector("html").onclick = function () {
  obr = 60;
  i = 1;
  timerflag = true;
  persent = 0;
  time10 = false;
  time60 = true;
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

  let synth = window.speechSynthesis,
    payse = new SpeechSynthesisUtterance("Поставлено на паузу"),
    play = new SpeechSynthesisUtterance("Продолжили"),
    relax = new SpeechSynthesisUtterance("Оттдых"),
    work = new SpeechSynthesisUtterance("Начали"),
    thank = new SpeechSynthesisUtterance("Спасибо за тренировку"),
    open = new SpeechSynthesisUtterance("Открываю");
  //------------------------------------------------------------------------------

  //timer-------------------------------------------------------------------------
  setTimeout(function () {
    timer();
    function timer() {
      document.querySelector(".timer").innerText = obr;
      let body = document.querySelector("body"),
        progress = document.querySelector(".progress");
      obr--;
      if (time60) {
        progress.style.width = persent * 1.73 + "%";
      }
      if (time10) {
        progress.style.width = persent * 11.8 + "%";
      }

      if (timerflag) {
        setTimeout(timer, 1000);
        persent++;
      }

      if (i % 2 == 1 && obr == 0) {
        persent = 0;
        time60 = false;
        time10 = true;
        body.style.background = "white";
        synth.speak(relax);
        setTimeout(function () {
          body.style.background = "#212121";
        }, 1500);
        i++;
        obr = 10;
      }
      if (i % 2 == 0 && obr == 0) {
        persent = 0;
        time60 = true;
        time10 = false;
        body.style.background = "white";
        synth.speak(work);
        setTimeout(function () {
          body.style.background = "#212121";
        }, 1500);
        i++;
        obr = 60;
      }
    }
    //------------------------------------------------------------------------------------------

    //all window opening arrays-----------------------------------------------------------------
    let youtube = [
      "Открыть YouTube",
      "YouTube",
      "программа для просмотра видео",
      "Open YouTube",
    ];
    let google = [
      "Google",
      "Открыть новую вкладку",
      "Открыть Гугл",
      "Открыть Google",
      "Гугл открыть",
      "Google открыть",
    ];
    let musicUrl = {
      0: "https://www.youtube.com/watch?v=7Nmhfg3QphU",
      1: "https://www.youtube.com/watch?v=1LB7pKaU0cc",
      2: "https://www.youtube.com/watch?v=vOwhytzk4Vo",
    };
    let music = [
      "Включи музыку",
      "Музыка",
      "Включи крутую музыку",
      "Можна музыку",
      "музыка",
      "Music",
      "music",
    ];

    //------------------------------------------------------------------------------------------

    //heart func -------------------------------------------------------------------------------
    heart();
    function heart() {
      let recognizer = new webkitSpeechRecognition();
      recognizer.interimResults = true;
      recognizer.lang = "ru-Ru";
      recognizer.start();
      recognizer.onresult = function (event) {
        let result = event.results[event.resultIndex];

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
          if (result[0].transcript == "закончили") {
            synth.speak(thank);
            window.close();
          }
          for (let j = 0; j < music.length; j++) {
            if (result[0].transcript == music[j]) {
              let random_music = Math.floor(Math.random() * Math.floor(3));
              window.open(musicUrl[random_music]);
              synth.speak(open);
            }
          }
          for (let j = 0; j < youtube.length; j++) {
            if (result[0].transcript == youtube[j]) {
              window.open("http://www.youtube.com");
              synth.speak(open);
            }
          }
          for (let j = 0; j < google.length; j++) {
            if (result[0].transcript == google[j]) {
              window.open("http://google.com");
              synth.speak(open);
            }
          }
        }
      };
      setTimeout(heart, 4000);
    }
  }, 3000);
};
//---------------------------------------------------------------------------
