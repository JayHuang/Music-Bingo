/*******************
* Author: Jay Huang
********************/

$(function() {
  createListing();
  createColumns();
  createColumnLabels();
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
    if ($(window).scrollTop() >= 70) {
      $(player).addClass('fixedplayer');
      $('.columnlabel').addClass('columnlabelfixed');
    } else {
      $(player).removeClass('fixedplayer');
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
    var $ol = $('<ol>');
    $(window.songlist.songs).each(function(index, song){
      var link = $("<a>", { 
        text: song.songname,// + " - " + song.artist,
        class: 'song'
      })
      .attr('data-src', path + song.file)
      .attr('data-playcount', '0')
      .attr('data-songid', song.id)
      .appendTo($ol)
      .wrap("<li></li>");

      // THIS CODE IS TO TEST WITH SCROLLBARS, COMMENT IT OUT AS YOU WISH
      // for(var i = 1; i < 10; ++i)
      //   link.clone(true).appendTo($ol).wrap("<li></li>");
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
  var a = audiojs.createAll({
    trackEnded: function() {
      updatePlayedAndPlaying();
      updateQueued();
    }
  });
  
  // Load in the first track
  var audio = a[0];
  first = $('ol a').attr('data-src');
  initializePlaying();
  updateColumnPlayedCount();
  updateQueued();
  audio.load(first);

  // Load in a track on click
  $("ol").find("li").click(function(e) {
    e.preventDefault();
    updatePlayedAndPlaying($(this));
    updateQueued();
  });

  // Set the first listing to playing
  function initializePlaying() {
    $("ol").find("li").first().addClass('playing');
  }

  // Update the played and playing listings
  function updatePlayedAndPlaying($this) {
    var $prev = $('.playing');
    var $next = $this || $prev.nextAll('li').not('.played').first();
    var playcount = $prev.children('a.song').attr('data-playcount');

    if(!$next.length) { // Last listing in column
      $next = $('.playing').parent().nextAll('.col').find('li').not('.played').first();
      if(!$next.length) $next = $('ol li').not('.played').first(); // Last song
    }
    $prev.children('a.song').attr('data-playcount', ++playcount);
    $prev.removeClass('playing').addClass('played');
    $next.addClass('playing');
    updateColumnPlayedCount();
    audio.load($('a', $next).attr('data-src'));
    audio.play();
  }

  // Update the queued listing
  function updateQueued() {
    var $next = $('.playing').nextAll ('li').not('.played').first();
    $('.queued').removeClass('queued');
    if(!$next.length) { // Last listing in column
      $next = $('.playing').parent().nextAll('.col').find('li').not('.played').first();
      if(!$next.length) $next = $('ol li').not('.played').first(); // Last song
    }
    $next.addClass('queued');
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
});