  function search() {
    var term = document.getElementById("search").value.trim();
    var links = "";

    var chapters = books[0].chapters;

    for (var i=0; i < chapters.length; i++) {
      var verses = chapters[i].verses;
      for (var k=0; k < verses.length; k++) {
        if (verses[k].text.toLowerCase().includes(term.toLowerCase())) {
          links += "<div><span onclick=\"playSnippet(this.id, this.innerHTML, ";
          links += verses[k].start + ", ";
          links += verses[k].end + ")\" size=\"60\" id=\"" + chapters[i].audio + "\">";
          links += chapters[i].chapter + ":";
          links += verses[k].verse + "</span> ";
          links += verses[k].text;
          links += "</div>";
        }
      }
    }

    document.getElementById("verses").innerHTML = links;
  }

  function writeBook() {
    var links = "";
    //Book name
    links += books[0].book + "<br>";

    var chapters = books[0].chapters;

    for (var i=0; i < chapters.length; i++) {
      var verses = chapters[i].verses;
      //Chapter
      links += "<br><div><span onclick=\"playSnippet(this.id, this.innerHTML, ";
      links += verses[0].start + ", ";
      links += verses[verses.length-1].end + ")\" size=\"60\" id=\"" + chapters[i].audio + "\">";
      links += "Capitulum " + chapters[i].chapter + "</span> ";
      links += "</div>";

      links += "<div id=\"chapter" + chapters[i].chapter + "\" style=\"display: none\">";
      for (var k=0; k < verses.length; k++) {
        //verse
        links += "<div";
        links += ">";
        links += "<span";
        links += " onclick=\"playSnippet(this.id, this.innerHTML, ";
        links += verses[k].start + ", ";
        links += verses[k].end + ")\" size=\"60\" id=\"" + chapters[i].audio + "\"";
        links += ">";
        links += chapters[i].chapter + ":";
        links += verses[k].verse + "</span> ";
        links += verses[k].text;
        links += "</div>";
      }
      links += "</div>";

    }

    document.getElementById("verses").innerHTML = links;
  }

  function writeChapterLinks() {
    var links = "";
    //Book name
    links += books[0].book + "<br>";

    var chapters = books[0].chapters;

    for (var i=0; i < chapters.length; i++) {
      //var verses = chapters[i].verses;
      //links += "<span onclick=writeVerses(this.innerHTML)>" + chapters[i].chapter + "</span> ";
      links += "<span onclick=\"writeVerses(this.innerHTML)\">" + chapters[i].chapter + "</span> ";
    }

    // <span onclick="writeVerses(3)">3</span>

    document.getElementById("chapters").innerHTML = links;
  }

  function writeVerses(chapter) {
    writeChapterLinks();

    var currentText = document.getElementById("verses").innerHTML;

    document.getElementById("verses").innerHTML + "<br>" + chapter;

     var links = "";

     var chapters = books[0].chapters;

    //for (var i=0; i < chapters.length; i++) {
    var chapterIndex = chapter-1;
      var verses = chapters[chapterIndex].verses;
      //links += chapters[i].chapter;
      for (var k=0; k < verses.length; k++) {
        links += "<div><span onclick=\"playSnippet(this.id, this.innerHTML, ";
        links += verses[k].start + ", ";
        links += verses[k].end + ")\" size=\"60\" id=\"" + chapters[chapterIndex].audio + "\">";
        links += chapters[chapterIndex].chapter + ":";
        links += verses[k].verse + "</span> ";
        links += verses[k].text;
        links += "</div>";
      }

    //}


    document.getElementById("verses").innerHTML = links;

  }


  /*function writeVerses() {
    var links = "";

    for (var i=0; i < chapters.length; i++) {
      var verses = chapters[i].verses;
      //links += chapters[i].chapter;
      for (var k=0; k < verses.length; k++) {
        links += "<div><span onclick=\"playSnippet(this.id, this.innerHTML, ";
        links += verses[k].start + ", ";
        links += verses[k].end + ")\" size=\"60\" id=\"" + chapters[i].audio + "\">";
        links += chapters[i].chapter + ":";
        links += verses[k].verse + "</span> ";
        links += verses[k].text;
        links += "</div>";
      }

    }


    document.getElementById("verses").innerHTML = links;


  }*/

    var audioElm = document.getElementById("audio1"); // Audio element
    var ratedisplay = document.getElementById("rate"); // Rate display area
    var showRateInput = document.getElementById("showrate");
    var debug = false;
    var nowPlaying = document.getElementById("nowPlaying");
    nowPlaying.innerHTML = "Now playing: ";

    function playSnippet(value, text, startSecs, durationSecs) {
        var link = "audio/" + value
        document.getElementById("audioFile").value = link;
        audioElm.src = link;
        ratedisplay = document.getElementById("rate"); // Rate display area
        showRateInput = document.getElementById("showrate");
        nowPlaying.innerHTML = "Now playing: " + text;
        playAudio2(startSecs, durationSecs);
      showDebug();

    }

  function playAudio2(startSecs, durationSecs) {
        document.getElementById("playbutton").innerHTML = "&#10074;&#10074;"; // Set button text == Pause
        // Get file from text box and assign it to the source of the audio element
        audioElm.playbackRate = document.getElementById("showrate").value;
        audioElm.currentTime = startSecs;
        document.getElementById("endTime").value = durationSecs;
        audioElm.play();
        var ct = setInterval(getCurrentTime, 200);

        showDebug();
    }

  function getCurrentTime() {
    var time = audioElm.currentTime;
    var end = document.getElementById("endTime").value;
    document.getElementById("currentTime").value = time;
    if (time > end) {
      audioElm.pause();
    }

  }




    function showDebug() {
        if (debug) {
            var msg = "Displayed rate: " + document.getElementById("showrate").value;
            msg += "<br>Playback rate: " + audioElm.playbackRate;
            msg += "<br>Current time: " + audioElm.currentTime;
            document.getElementById("debug").innerHTML = msg;
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
        showDebug();
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
        showDebug();
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
