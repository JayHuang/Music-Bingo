$(function() {
  //createListing();
  createColumns();
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
  $(window).scroll(function() {
    if ($(window).scrollTop() >= 70)
      $(player).addClass('fixedplayer');
    else 
      $(player).removeClass('fixedplayer');
  });

  // On window resize event, update the width of each song listing
  $(window).resize(function() {
    waitForFinalEvent(function() {
      updateSongWidth();
    }, 30, "8239839");
  });

  // If autoadd is clicked, add the first 75 songs in the songs folder into a songlist and then into the player
  $('#autoadd').on('click', function(e){
  	e.preventDefault();
  	//Get array of files included in the songs folder
  	var songsFolder = new Enumerator($('songs/').Files);
  	//Create songlist
  	window.songlist = {
  		"songs": [
		  	//Get the first 75 songs in songsFolder 
		  	for(i = 0; i < 75; i++){
		  		//get song name
		  		songsFolder.item().name;
		  		//get song artist
		  		
		  		//get song path
		  		songsFolder.item().path;
		  		//move to next song in songsFolder
		  		songsFolder.moveNext();
		  	}
	  	]
  	}
  });

  // Create songs listing
  function createListing(){
    var path = 'songs/';
    var $ol = $('<ol>');
    $(window.songlist.songs).each(function(index, song){
      var link = $("<a>", { 
        text: song.songname + " - " + song.artist,
        class: 'song'
      })
      .attr('data-src', path + song.file)
      .attr('data-playcount', '0')
      .attr('data-songid', song.id)
      .appendTo($ol)
      .wrap("<li></li>");

      // THIS CODE IS TO TEST WITH SCROLLBARS, COMMENT IT OUT AS YOU WISH
      /*link.clone(true).appendTo($ol).wrap("<li></li>");
      link.clone(true).appendTo($ol).wrap("<li></li>");
      link.clone(true).appendTo($ol).wrap("<li></li>");
      link.clone(true).appendTo($ol).wrap("<li></li>");*/
    });
    $ol.appendTo("#listing");
    window.musicbingo = {
      "origwidth" : $("ol").find("li").width(),f
      "origheight" : $("ol").find("li").height()
    }
    $("ol").find("li").each(function() {
      $(this).hover(
        function() {
          $(this).stop().animate({height: window.musicbingo.origheight * 2}, 200);
          $(this).children(':first').css({"overflow":"visible", "white-space":"normal"});
        }, function() {
          $(this).stop().animate({width: window.musicbingo.origwidth, height: window.musicbingo.origheight}, 100);
          $(this).children(':first').css({"overflow":"hidden", "white-space":"nowrap"});
      });
      // $(this).clone(true).attr({"class":"song-detail"}).css({"display":"block", "z-index": 1}).appendTo($ol).wrap("<li></li>");
    });
    $ol.appendTo("#listing");
  }

  // If reset is clicked, reset all songs
  $('#resetsongs').on('click', function(e) {
    e.preventDefault();
    $("ol").find("li").each(function(){
      $(this).removeClass('played playing queued').attr('data-playcount', 0);
    });
  });


  // Instead of using CSS3 column count, use CSS3 columns
  function createColumns() {
    var container;
    var i = 0;
    var numCols = 5;
    var colCount = Math.ceil($("ol").find("li").length / numCols);
      $("ol").find("li").each(function () {
        if (i % colCount === 0)
            container = $('<div class="col"></div>').appendTo("ol");

        $(this).appendTo(container);
        i++;
    });
  }

  // Make the items more packed on window resize
  function updateSongWidth(){
    var w = $('ol').width();
    var margins = parseInt($("ol").find("li").css('marginLeft')) + parseInt($("ol").find("li").css('marginRight'));
    $("ol").find("li").each(function() {
      $(this).width(w/5-margins);
    });
    window.musicbingo.origwidth = $("ol").find("li").width();
    window.musicbingo.origheight = $("ol").find("li").height();
  }

  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId)
        uniqueId = "Don't call this twice without a uniqueId";

      if (timers[uniqueId])
        clearTimeout (timers[uniqueId]);

      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

  // Setup the player to autoplay the next track
  var a = audiojs.createAll({
    trackEnded: function() {
      var $prev = $('.playing');
      var next = $prev.nextAll('li').not('.played').first();
      if (!next.length) next = $("ol").find("li").siblings().not('.played').first();
      var playcount = $prev.children('a.song').attr('data-playcount');
      $prev.children('a.song').attr('data-playcount', ++playcount);
      $prev.removeClass('playing').addClass('played');
      next.addClass('playing');
      setupQueued();
      audio.load($('a', next).attr('data-src'));
      audio.play();
    }
  });
  
  // Load in the first track
  var audio = a[0];
  first = $('ol a').attr('data-src');
  $("ol").find("li").first().addClass('playing');
  setupQueued();
  audio.load(first);

  // Load in a track on click
  $("ol").find("li").click(function(e) {
    e.preventDefault();
    var $prev = $('.playing');
    var playcount = $prev.children('a.song').attr('data-playcount');
    $prev.children('a.song').attr('data-playcount', ++playcount);
    $prev.removeClass('playing').addClass('played');
    $(this).addClass('playing').siblings();
    setupQueued();
    audio.load($('a', this).attr('data-src'));
    // var oldtext = $(this).children('a').text();
    // $(this).children('a').text(oldtext + "\u266B");
    audio.play();
  });

  function setupQueued(){
    $('.queued').removeClass('queued');
    if($('.playing').nextAll('li').not('.played').length == 0)
      $('.playing').siblings().not('.played').first().addClass('queued');
    else
      $('.playing').nextAll('li').not('.played').first().addClass('queued');
  }

  // Keyboard shortcuts
  $(document).keydown(function(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
       // right arrow
       if (unicode == 39) {
        var next = $('.playing').next();
        if (!next.length) next = $("ol").find("li").first();
        next.click();
      // back arrow
    } else if (unicode == 37) {
      var prev = $('.playing').prev();
      if (!prev.length) prev = $("ol").find("li").last();
      prev.click();
      // spacebar
    } else if (unicode == 32) {
      audio.playPause();
    }
  })
});