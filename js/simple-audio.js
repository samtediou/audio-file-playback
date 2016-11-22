  var audioElm = document.getElementById("audio1"); // Audio element
  var ratedisplay = document.getElementById("rate"); // Rate display area
  var showRateInput = document.getElementById("showrate");

  function playAt(startSecs, endSecs) {
      ratedisplay = document.getElementById("rate"); // Rate display area
      showRateInput = document.getElementById("showrate");
      document.getElementById("playbutton").innerHTML = "&#10074;&#10074;"; // Set button text == Pause
      audioElm.playbackRate = document.getElementById("showrate").value;
      audioElm.currentTime = startSecs;
      document.getElementById("endTime").value = endSecs;
      playAudio();
  }

function getCurrentTime() {
  var time = audioElm.currentTime;
  document.getElementById("displayCurrentTime").innerHTML = time;
  document.getElementById("currentTime").value = time;

  var end = document.getElementById("endTime").value;
  if (time > end) {
    audioElm.pause();
  }

}

function displayTime() {
  var time = audioElm.currentTime;
  var end = document.getElementById("endTime").value;
  document.getElementById("currentTime").value = time;
  document.getElementById("displayCurrentTime").innerHTML = time;
  if (time > end) {
    audioElm.pause();
  }
}



  function loadFile(value, text) {
      var link = "audio/" + value
      document.getElementById("audioFile").value = link;
      audioElm.src = link;
      ratedisplay = document.getElementById("rate"); // Rate display area
      showRateInput = document.getElementById("showrate");
      nowPlaying.innerHTML = "Now playing: " + text;
      playAudio();
  }


  //  Alternates between play and pause based on the value of the paused property
  function togglePlay() {
      if (document.getElementById("audio1")) {
          if (audioElm.paused == true) {
              playAudio(audioElm);    //  if player is paused, then play the file
          } else {
              pauseAudio(audioElm);   //  if player is playing, then pause
          }
      }
  }

  function skipAudio(interval) {
      if (window.HTMLAudioElement) {
          try {
              audioElm.currentTime += interval;
          } catch (e) {
              // Fail silently but show in F12 developer tools console
              if(window.console && console.error("Error:" + e));
          }
      }
      showDebug();
  }

  function playAudio() {
      document.getElementById("playbutton").innerHTML = "&#10074;&#10074;"; // Set button text == Pause
      // Get file from text box and assign it to the source of the audio element
      audioElm.playbackRate = document.getElementById("showrate").value;
      audioElm.play();
      var ct = setInterval(displayTime, 200);
  }

  function pauseAudio() {
      document.getElementById("playbutton").innerHTML = "&#9658;"; // Set button text == Play
      audioElm.pause();
      showDebug();
  }

  function setSpeed(speed) {
      showRateInput.value = speed;
      audioElm.playbackRate = speed;
      showDebug();
  }
