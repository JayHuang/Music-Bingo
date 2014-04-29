$(function() {
  createListing();
  createColumns();
  updateSongWidth();

  // If the user scrolls away from the top, keep the player in view
  $(window).scroll(function() {
    if ($(window).scrollTop() >= 70)
       $('#player').addClass('fixedplayer');
    else 
       $('#player').removeClass('fixedplayer');
  });

  // On window resize event, update the width of each song listing
  $(window).resize(function() {
    waitForFinalEvent(function() {
      updateSongWidth();
    }, 100, "8239839");
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
      link.clone(true).appendTo($ol).wrap("<li></li>");
      link.clone(true).appendTo($ol).wrap("<li></li>");
      link.clone(true).appendTo($ol).wrap("<li></li>");
      link.clone(true).appendTo($ol).wrap("<li></li>");
    });
    $ol.appendTo("div#listing");
    window.musicbingo = {
      "origwidth" : $('a.song').parent().width(),
      "origheight" : $('a.song').parent().height()
    }
    $('a.song').parent().each(function() {
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
    $ol.appendTo("div#listing");
  }

  // If reset is clicked, reset all songs
  $('#resetsongs').on('click', function(e) {
    e.preventDefault();
    $('ol li').each(function(){
      $(this).removeClass('played playing queued').attr('data-playcount', 0);
    });
  });

  // Instead of using CSS3 column count, use CSS3 columns
  function createColumns() {
    var container;
    var i = 0;
    var numCols = 5;
    var colCount = Math.ceil($('ol li').length / numCols);
      $('ol li').each(function () {
        if (i % colCount === 0)
            container = $('<div class="col"></div>').appendTo("ol");

        $(this).appendTo(container);
        i++;
    });
  }

  // Make the items more packed on window resize
  function updateSongWidth(){
    var w = $('ol').width();
    var margins = parseInt($('ol li').css('marginLeft')) + parseInt($('ol li').css('marginRight'));
    $('a.song').each(function() {
      $(this).parent().width(w/5-margins);
    });
    window.musicbingo.origwidth = $('a.song').parent().width();
    window.musicbingo.origheight = $('a.song').parent().height();
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
      var $prev = $('ol li.playing');
      var next = $prev.nextAll('li').not('.played').first();
      var playcount = $prev.children('a.song').attr('data-playcount');
      $prev.children('a.song').attr('data-playcount', ++playcount);
      if (!next.length) next = $('ol li').siblings().not('.played').first();
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
  $('ol li').first().addClass('playing');
  setupQueued();
  audio.load(first);

  // Load in a track on click
  $('ol li').click(function(e) {
    e.preventDefault();
    var $prev = $('ol li.playing');
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
    $('ol li.queued').removeClass('queued');
    if($('ol li.playing').nextAll('li').not('.played').length == 0)
      $('ol li.playing').siblings().not('.played').first().addClass('queued');
    else
      $('ol li.playing').nextAll('li').not('.played').first().addClass('queued');
  }

  // Keyboard shortcuts
  $(document).keydown(function(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
       // right arrow
       if (unicode == 39) {
        var next = $('li.playing').next();
        if (!next.length) next = $('ol li').first();
        next.click();
      // back arrow
    } else if (unicode == 37) {
      var prev = $('li.playing').prev();
      if (!prev.length) prev = $('ol li').last();
      prev.click();
      // spacebar
    } else if (unicode == 32) {
      audio.playPause();
    }
  })
});