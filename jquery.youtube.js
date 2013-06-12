/**
 * jQuery Youtube v0.0.1
 * https://github.com/MikeSilvis/jQuery.youtube.js
 * Copyright 2013 Mike Silvis & Horace Williams
 * Released under the MIT license
 */
jQuery.fn.youtubePlayer = function(youtubeId, options) {
  options = typeof options !== 'undefined' ? options : {};

  if (!$(this).attr("id"))
    $(this).attr("id", $(this).data("youtube-id")); // dynamically creates an ID if non exist

  var elementId         = $(this).attr('id');
  var playerWidth       = options.width        || $(this).data("width")         || '620';
  var playerHeight      = options.height       || $(this).data("height")        || '349';
  var trackingCategory  = options.category     || $(this).data("category")      || 'youtube';
  var trackingAction    = options.action       || $(this).data("action")        || 'youtube';
  var playerVars        = options.playerVars   || $(this).data("player-vars")   || {rel: 0};

  createPlayer = function(){
    new YT.Player(elementId, {
      height: playerHeight,
      width: playerWidth,
      videoId: youtubeId,
      playerVars: playerVars,
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }

  var playerViewed = false;
  var playerEnded = false;
  playerChanged = function(event) {
    if (event.data == YT.PlayerState.PLAYING && !playerViewed) {
      if (typeof(_gaq) != "undefined") {
        _gaq.push(['_trackEvent', trackingCategory, trackingAction, 'viewed', 1, true]);
      }
      $("#"+elementId).trigger("started");
      playerViewed = true; //mark the player as viewed so we won't duplicate tracking
    }
    if (event.data == YT.PlayerState.ENDED && !playerEnded ) {
      if (typeof(_gaq) != "undefined") {
        _gaq.push(['_trackEvent', trackingCategory, trackingAction, 'ended', 1, true]);
      }
      $("#"+elementId).trigger("ended");
      playerEnded = true; //mark the player as viewed so we won't duplicate tracking
    }
  }

  //load the Youtube API JS
  var tag = document.createElement('script');
  tag.src = "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function() {
    createPlayer();
  }

  window.onPlayerStateChange = function(event) {
    playerChanged(event);
  }

  $(this);
};
$(function() {
  $.each($('.ga-youtube'), function(index, value) {
    if ($(this).data("youtube-id")){
      $(this).youtubePlayer($(this).data("youtube-id"));
    }
  });
});
