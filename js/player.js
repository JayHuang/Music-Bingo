/*******************
* Author: Jay Huang
********************/

var buttonSet = true;
var buttonSet2 = true;

$(function() {
  createListing();
  createColumns();
  createColumnLabels();
  makeBingo();
  updateSongWidth();

  var body = document.body, timer;
  var player = document.getElementById('player');

  window.addEventListener('scroll', function() {
    clearTimeout(timer);
    if(!body.classList.contains('disable-hover'))
      body.classList.add('disable-hover');
  
    timer = setTimeout(function(){
      body.classList.remove('disable-hover');
    }, 100);
  }, false);

  // If the user scrolls away from the top, keep the player in view
  /*$(window).scroll(function() {
    if ($(window).scrollTop() >= 70) {
      $(player).addClass('fixedplayer');
      $('.columnlabel').addClass('columnlabelfixed');
    } else {
      $(player).removeClass('fixedplayer');
      $('.columnlabel').removeClass('columnlabelfixed');
    }
  });*/
  $(window).scroll(function() {
    var player = document.getElementById('player');
    var offset = parseInt($(player).height()) + parseInt($(player).css('paddingBottom'));
 
    if ($(window).scrollTop() >= 1) {
	  //$(player).addClass('fixedplayer');
      $('.columnlabel').addClass('columnlabelfixed');
      $('.columnlabel').css({"top": offset-1});
    } else {
      //$(player).removeClass('fixedplayer');
      $('.columnlabel').removeClass('columnlabelfixed');
    }
  });

  // On window resize event, update the width of each song listing
  $(window).resize(function() {
    waitForFinalEvent(function() {
      updateSongWidth();
    }, 30, "8239839");
  });

  // Create songs listing
  function createListing(){
    var path = 'songs/';
	// Danny Lieu
	var samplePath = 'songs/sample/';
    var $ol = $('<ol>');
    $(window.songlist.songs).each(function(index, song){
      var link = $("<a>", { 
        text: song.songname,// + " - " + song.artist,
        class: 'song'
      })
      .attr('data-src', path + song.file)
	  // Danny Lieu
	  .attr('data-sample', samplePath + setSampleSong(song.id))
      .attr('data-playcount', '0')
      .attr('data-songid', song.id)
      .appendTo($ol)
      .wrap("<li></li>");

      // THIS CODE IS TO TEST WITH SCROLLBARS, COMMENT IT OUT AS YOU WISH
       //for(var i = 1; i < 10; ++i)
         //link.clone(true).appendTo($ol).wrap("<li></li>");
    });
    $ol.appendTo("#listing");
    window.musicbingo = {
      "origwidth" : $("ol").find("li").width(),
      "origheight" : $("ol").find("li").height(),
      "marginbottom" : parseInt($("ol").find("li").css('margin-bottom'))
    }

    // Attach hover event to each listing
    $("ol").find("li").each(function() {
      $(this).hover(
        function() {
          $(this).stop().animate({height: window.musicbingo.origheight * 2 + window.musicbingo.marginbottom}, 200);
          $(this).children(':first').css({"overflow":"visible", "white-space":"normal"});
        }, function() {
          $(this).stop().animate({height: window.musicbingo.origheight}, 100);
          $(this).children(':first').css({"overflow":"hidden", "white-space":"nowrap"});
      });
    });
  }

  // If reset is clicked, reset all songs
  $('#resetsongs').on('click', function(e) {
    e.preventDefault();
	$("ol").find("li").each(function(){
      $(this).removeClass('played playing queued').attr('data-playcount', 0);
    });

    $(".col").find(".colplayedcount").each(function(){
      $(this).text('').hide();
    });
	if(!document.getElementById('Random').checked){
		updatePlayedAndPlaying();
		updateQueued();
	}
	else{
		RandomChanged();
	}
  });

  // Instead of using CSS3 column count, use CSS3 columns to create columns
  function createColumns() {
    var container;
    var i = 0;
    var numCols = 5;
    var $listings = $("ol").find("li");
    var colCount = Math.ceil($listings.length / numCols);
      $listings.each(function () {
        if (i % colCount === 0)
            container = $('<div class="col"></div>').appendTo("ol");

        $(this).appendTo(container);
        i++;
    });
  }

  // Create labels for the columns (B,I,N,G,O)
  function createColumnLabels() {
    var $cols = $('#listing').find('.col');
    var labeltext = ['B', 'I', 'N', 'G', 'O'];
    var label = "<div class='columnlabel'></div>";
    if($cols.length == 5 && labeltext.length == 5) {
      for(var i = 0; i < labeltext.length; i++) {
        $($cols[i]).prepend($(label).text(labeltext[i]).append('<span class="colplayedcount"></span>'));
      }
    }
  }

  function updateColumnPlayedCount() {
    var $colplayedcounts = $('.colplayedcount', '#listing');
    $('.col', '#listing').each(function() {
      var count = $(this).find('.played').length + $(this).find('.playing').length;
      var $countspan = $(this).find('.colplayedcount');
      if(count != 0) {
        $countspan.show();
        $countspan.text(count);
      } else {
        $countspan.hide();
      }
    });
  }

  // Make the items more packed on window resize
  function updateSongWidth(){
    var w = $('ol').width();
    var $listings = $("ol").find("li");
    var margins = parseInt($listings.css('marginLeft')) + parseInt($listings.css('marginRight'));
    $("ol").find("li, .columnlabel").each(function() {
      $(this).width(w/5-margins);
    });
    window.musicbingo.origwidth = $listings.width();
    window.musicbingo.origheight = $listings.height();
  }

  // Wait for the final event to occur with a timeout
  var waitForFinalEvent = (function() {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId)
        uniqueId = "Don't call this twice without a uniqueID";

      if (timers[uniqueId])
        clearTimeout (timers[uniqueId]);

      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

  // Setup the player to autoplay the next track
  var audio = audiojs.create(document.getElementById("jay-audio"),{////var a = audiojs.createAll({
    trackEnded: function() {
      updatePlayedAndPlaying();
      updateQueued();
    }
  });
  
  // Danny Lieu audio
  var sampleAudio = audiojs.create(document.getElementById("sample-audio"), {
	trackEnded: function() {
		updateSampleSong();
	}
  });
  // Danny Lieu
  var duration;
  function updateSampleSong($this) {	
    var $nextSong = $this || $('ol li.queued');   

    if(!$nextSong.length) { // Last listing in column
      $nextSong = $('.playing').parent().nextAll('.col').find('li').not('.played').first();
      if(!$nextSong.length) $nextSong = $('ol li').not('.played').first(); // Last song
    }  
	sampleAudio.load($('a', $nextSong).attr('data-sample'));	
	duration = sampleAudio.duration * 1000;    
  }
  
  function setSampleSong(songId) {	
	var file;
	switch (Math.floor((songId - 1) / 15)) {
		case 0:
			file = "B.mp3";		
			break;
		case 1:
			file = "I.mp3";			
			break;
		case 2:
			file = "N.mp3";			
			break;
		case 3:
			file = "G.mp3";			
			break;
		case 4:
			file = "O.mp3";			
			break;
	}
	return file;
  }
  
  // Load in the first track
  //// var audio = a[0];
  first = $('ol a').attr('data-src');
  initializePlaying();
  updateColumnPlayedCount();
  updateQueued();
  audio.load(first);
 
  // Load in a track on click
  $("ol").find("li").click(function(e) {
    e.preventDefault();
    updateSampleSong($(this));
    updatePlayedAndPlaying($(this));
    updateQueued();
  });
 
  $('div .play-pause').click(function(e) {
    e.preventDefault();
    playPressed();
  });
  
  function initializePlaying() {
    if(!document.getElementById("Random").checked)
        $("ol").find("li").first().addClass('playing');
    else{
        var length = $('ol div li').not('.played').length;
        var x1 = Math.floor((Math.random() * length));
        $('ol div li').not('.played')[x1].classList.add("playing");
    }
  }
 
  function playPressed(){
    if($('div.playing')[0]){
        $('li.playing').addClass('played');
		if(document.getElementById("Narrator").checked){
			sampleAudio.play();
			setTimeout(function() { audio.play()}, duration);
		}
	}
		
  }

  // Update the played and playing listings
  function updatePlayedAndPlaying($this) {
    var $prev = $('.playing');
    var $next = $this || $('ol li.queued');
    var playcount = $prev.children('a.song').attr('data-playcount');

    if(!$next.length) { // Last listing in column
      $next = $('.playing').parent().nextAll('.col').find('li').not('.played').first();
      if(!$next.length) $next = $('ol li').not('.played').first(); // Last song
    }
    $prev.children('a.song').attr('data-playcount', ++playcount);
    $prev.removeClass('playing')
    $next.addClass('playing');
    updateColumnPlayedCount();
    audio.load($('a', $next).attr('data-src'));
	if (document.getElementById("Narrator").checked){ 
		if (document.getElementById("Auto").checked) 
			sampleAudio.play();
			setTimeout(function() { audio.play()}, duration);
		
	}
	else{
		if(document.getElementById("Auto").checked)
			audio.play();
	}
	if(document.getElementById("Auto").checked)
		$prev.addClass('played');
  }

  function RandomChanged(){
	var list = $('ol div li').not('.played').not('.playing').length;
	var x1 = Math.floor((Math.random() * list));
	$('ol li.playing').removeClass('playing');
	$('ol div li').not('.played').not('.playing')[x1].classList.add("playing");
	updateQueued();
}
  
  // Update the queued listing
  function updateQueued() {
    var $next = $('.playing').nextAll ('li').not('.played').first();
	$('.queued').removeClass('queued');
	if(document.getElementById("Random").checked){
		var length = $('ol div li').not('.played').not('.playing').length;
		var x1 = Math.floor((Math.random() * length));
		$('ol div li').not('.played').not('.playing')[x1].classList.add("queued");
	}
	else{
		if(!$next.length) { // Last listing in column
			$next = $('.playing').parent().nextAll('.col').find('li').not('.played').first();
			if(!$next.length) $next = $('ol li').not('.played').first(); // Last song
		}
		$next.addClass('queued');
    }
  }


  // Keyboard shortcuts
  $(document).keydown(function(e) { 
    var unicode = e.charCode ? e.charCode : e.keyCode;
       if (unicode == 39) { // Right arrow
        var next = $('.playing').next();
        if (!next.length) next = $("ol").find("li").first();
        next.click();
    } else if (unicode == 37) { // Back arrow
      var prev = $('.playing').prev();
      if (!prev.length) prev = $("ol").find("li").last();
      prev.click();
    } else if (unicode == 32) { // Spacebar
      e.preventDefault(); // Disable scroll
      audio.playPause();
    }
  })
  
  
  //Calls check when you press Enter in the textbox
  $("#CardID").keyup(function(event){
        //document.getElementById('Bingo').innerText = 'Some Text';
        if(event.keyCode == 13){
        
            check();
        }
    });
    
    // Bingo Checker matches played songs and songs in the bingo card.
    function check() {
        var boolarray = [false, false, false, false, false, false, false, false, false, false, false, false, true,
        false, false, false, false, false, false, false, false, false, false, false, false];
		
		//Finds the location where the ID should be.
        var place = cardlist.cards[(document.getElementById('CardID').value.replace(/[A-Za-z]+/g, ''))-1];
        
		//Checks to see if the ID's match. 
		if(place.id != document.getElementById('CardID').value){
            alert("ID dosent exist");
        }
        else{
			//Adds the Card ID to the screen.
			document.getElementById('cardTitle').innerHTML = "";
			$('#cardTitle').append(document.getElementById('CardID').value);
            
			//Matches songs played.
			for (var i = 0; i < place.info.length; i++){
                for(var j = 0; j < $('.played a.song').length; j++){
                    if($('.played a.song')[j].getAttribute("data-songid") == place.info[i]){
                        boolarray[i] = true;
                        break;
                    }
                }
            }
            var x = 0;
            var string = "";
            while(x < boolarray.length){
                string += boolarray[x++];
                if(x%5 == 0)
                    string += "\n";
            }
            for (var x = 0; x<boolarray.length; x++){
                if(boolarray[x] == true){
                    $(".slot")[x].classList.add("played");
                }
                else{
                    $(".slot")[x].classList.remove("played");
                }
            }
        }
    }
});

function playIntroSample() {
	var path = "songs/intro/";
	var audio = new Audio(path + "intro.wav");
	audio.play();
}

function makeBingo(){
    var $hold = $('<div id="holdBingo" style = "display: none"></div>').appendTo("#listing");
    $('<input type="text" id="CardID" value="">').appendTo($hold);
    $('<div id="cardTitle"></div>').appendTo($hold);
    $hold = $('<div id="pattern"></div>').appendTo($hold);
	$('<div class="letters">B</div>').appendTo($hold);
	$('<div class="letters">I</div>').appendTo($hold);
	$('<div class="letters">N</div>').appendTo($hold);
	$('<div class="letters">G</div>').appendTo($hold);
	$('<div class="letters">O</div>').appendTo($hold);
    for(var x = 0; x < 25; x++){
        $('<div class="slot"></div>').appendTo($hold);
    }
}
 
function otherpage(){
    //$("#listing ol div.col").hide("slide", {direction: "left" }, 1000);
    //$("#listing ol div.col").show("slide", { direction: "right" }, 1000);
    if(buttonSet){
        buttonSet = false;
		$(".onoffswitch").hide();
        $("#listing ol").hide();
        $("#holdBingo").show();
    }
    else{
        buttonSet = true;
		$(".onoffswitch").hide();
        $("#listing ol").show();
        $("#holdBingo").hide();
    }
}

function otherpage2(){
    //$("#listing ol div.col").hide("slide", {direction: "left" }, 1000);
    //$("#listing ol div.col").show("slide", { direction: "right" }, 1000);
    if(buttonSet2){
        buttonSet2 = false;
		$("#holdBingo").hide();
        $("#listing ol").hide();
        $(".onoffswitch").show();
    }
    else{
        buttonSet2 = true;$this
		if(buttonSet){
			$("#holdBingo").hide();
			$("#listing ol").show();
		}
		else{
			$("#holdBingo").show();
			$("#listing ol").hide();
		}
        $(".onoffswitch").hide();
    }
}

//automatically randomizes when random is clicked in settings
function RandomClicked() {
	var list = $('ol div li').not('.played').not('.playing').length;
	var x1 = Math.floor((Math.random() * list));
	var $next = $('.playing').nextAll ('li').not('.played').first();
	$('.queued').removeClass('queued');
	$('ol li.playing').removeClass('playing');
	$('ol div li').not('.played').not('.playing')[x1].classList.add("playing");
	var length = $('ol div li').not('.played').not('.playing').length;
	var x1 = Math.floor((Math.random() * length));
	$('ol div li').not('.played').not('.playing')[x1].classList.add("queued");
}

function addSongList(location) {
	var hold = "<script src="+location+"></script>";
	$("#holdScript").remove();
	$("#holdScript").append(hold);
}