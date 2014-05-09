var buttonSet = true;

$(function() {
  createListing();
  createColumns();
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
      //for(var i = 1; i < 10; ++i)
        //link.clone(true).appendTo($ol).wrap("<li></li>");
    });
	
	//attaches the ordered list to the listing div
	 
    $ol.appendTo("#listing");
    window.musicbingo = {
      "origwidth" : $("ol").find("li").width(),
      "origheight" : $("ol").find("li").height(),
      "marginbottom" : parseInt($("ol").find("li").css('margin-bottom'))
    }
    $("ol").find("li").each(function() {
      $(this).hover(
        function() {
          $(this).stop().animate({height: window.musicbingo.origheight * 2 + window.musicbingo.marginbottom}, 200);
          $(this).children(':first').css({"overflow":"visible", "white-space":"normal"});
        }, function() {
          $(this).stop().animate({height: window.musicbingo.origheight}, 100);
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
      updatePlayedAndPlaying();
      updateQueued();
    }
  });
  
  // Load in the first track
  var audio = a[0];
  first = $('ol a').attr('data-src');
  initializePlaying();
  updateQueued();
  audio.load(first);

  // Load in a track on click
  $("ol").find("li").click(function(e) {
    e.preventDefault();
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
	if($('div.playing')[0])
		$('li.playing').addClass('played');
  }
  
  function updatePlayedAndPlaying($this) {
    var $prev = $('.playing');
    var $next = $this || $('ol li.queued');
    var playcount = $prev.children('a.song').attr('data-playcount');

    if(!$next.length) { // Last listing in column
      $next = $('.playing').parent().nextAll('.col').find('li').not('.played').first();
      if(!$next.length) $next = $('ol li').not('.played').first(); // Last song
    }
    $prev.children('a.song').attr('data-playcount', ++playcount);
    $prev.removeClass('playing');
    $next.addClass('playing');
    audio.load($('a', $next).attr('data-src'));
    if(document.getElementById("Auto").checked){
		$prev.addClass('played');
		audio.play();
	}
  }

  // Keyboard shortcuts
  $(document).keydown(function(e) { 
    var unicode = e.charCode ? e.charCode : e.keyCode;
       if (unicode == 39) { // right arrow
        var next = $('.playing').next();
        if (!next.length) next = $("ol").find("li").first();
        next.click();
    } else if (unicode == 37) { // back arrow
      var prev = $('.playing').prev();
      if (!prev.length) prev = $("ol").find("li").last();
      prev.click();
    } else if (unicode == 32) { // spacebar
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
        
        var place = cardlist.cards[(document.getElementById('CardID').value.replace(/[A-Za-z]+/g, ''))-1];
        if(place.id != document.getElementById('CardID').value){
            alert("ID dosent exist");
        }
        else{
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
            console.log("ok");
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
function RandomChanged(){
	var list = $('ol div li').not('.played').not('.playing').length;
	var x1 = Math.floor((Math.random() * list));
	$('ol li.playing').removeClass('playing');
	$('ol div li').not('.played').not('.playing')[x1].classList.add("playing");
	updateQueued();
}

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

function makeBingo(){
    var $hold = $('<div id="holdBingo" style = "display: none"></div>').appendTo("#listing");
    $('<input type="text" id="CardID" value="">').appendTo($hold);
    $('<div id="cardTitle"></div>').appendTo($hold);
    $hold = $('<div id="pattern"></div>').appendTo($hold);
    for(var x = 0; x < 25; x++){
        $('<div class="slot"></div>').appendTo($hold);
    }
}
 
function otherpage(){
    //$("#listing ol div.col").hide("slide", {direction: "left" }, 1000);
    //$("#listing ol div.col").show("slide", { direction: "right" }, 1000);
    if(buttonSet){
        buttonSet = false;
        $("#listing ol").hide();
        $("#holdBingo").show();
    }
    else{
        buttonSet = true;
        $("#listing ol").show();
        $("#holdBingo").hide();
    }
 
}