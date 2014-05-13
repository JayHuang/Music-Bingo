/*******************
* Author: Jay Huang
********************/

$(function() {
  createListing();
  createColumns();
  createColumnLabels();
  updateSongWidth();
  createTabs();

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
  $(window).scroll(function() {
    var player = document.getElementById('player');
    var offset = parseInt($(player).height()) + parseInt($(player).css('paddingBottom'));

    if ($(window).scrollTop() >= 1) {
      $('.columnlabel').addClass('columnlabelfixed');
      $('.columnlabel').css({"top": offset-1});
    } else {
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
	  .attr('data-sample', samplePath + setSampleSong(song.id))
      .attr('data-playcount', '0')
      .attr('data-songid', song.id)
      .appendTo($ol)
      .wrap("<li></li>");

      // THIS CODE IS TO TEST WITH SCROLLBARS, COMMENT IT OUT AS YOU WISH
       for(var i = 1; i < 10; ++i)
         link.clone(true).appendTo($ol).wrap("<li></li>");
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
  var audio = audiojs.create(document.getElementById("jay-audio"),{
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
  first = $('ol a').attr('data-src');
  initializePlaying();
  updateColumnPlayedCount();
  updateQueued();
  audio.load(first);

  // Load in a track on click
  $("ol").find("li").click(function(e) {
    e.preventDefault();
    if(!$(this).hasClass('playing')){
	  updateSampleSong($(this));
      updatePlayedAndPlaying($(this));
      updateQueued();
    }
  });

  // Set the first listing to playing
  function initializePlaying() {
    $("ol").find("li").first().addClass('playing');
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
	if (document.getElementById("Narrator").checked) sampleAudio.play();
	else duration = 0;
	if (document.getElementById("Auto").checked) {
		$prev.addClass('played');
		setTimeout(function() { audio.play()}, duration);
	}
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
  
  function createTabs() {
	$('.tabs .tab-links a').on('click', function(e) {
		var currentAttrValue = $(this).attr('href');
		
		$('.tabs ' + currentAttrValue).show().siblings().hide();
		
		$(this).parent('li').addClass('active').siblings().removeClass('active');
		
		e.preventDefault();
	});
  }
  
  function RandomChanged(){
	var list = $('ol div li').not('.played').not('.playing').length;
	var x1 = Math.floor((Math.random() * list));
	$('ol li.playing').removeClass('playing');
	$('ol div li').not('.played').not('.playing')[x1].classList.add("playing");
	updateQueued();
  }

  function playIntroSample() {
	var path = "songs/intro/";
	var audio = new Audio(path + "intro.wav");
	audio.play();
  }
});
