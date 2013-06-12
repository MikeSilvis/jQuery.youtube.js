jQuery.youtube.js
=================

Provides an easy to use wrapper around GA tracking for YouTube videos that allow you never have to type any JavaScript.

## Automagically:

``` html
<div class="ga-youtube" data-youtube-id="33jb2Ns7yaQ" data-width="620" data-height="349" data-category="Example" data-action="Youtube">
</div>
```

By default it will fire an event with the following params when the video has started playing:

``` javascript
_trackEvent("Example", "Youtube", "viewed", 1, true)
```

The only mandatory fields are the class `ga-youtube`, and `data-youtube-id`.

This also triggers an event you can listen for elsewhere by binding to the ID of the video:

``` javascript
  $("#"+elementId).trigger("started");
```
## Manually:

``` javascript
  $(this).youtubePlayer(youtubeId, {}); // Takes the youtube ID, and an options hash.
```

## Options & Fallbacks

First it tries to find the params passed in as a hash, then it falls back to a data attribute, and lastly it falls back to sensible defaults.
``` javascript
  var elementId         = $(this).attr('id');
  var playerWidth       = options.width        || $(this).data("width")         || '620';
  var playerHeight      = options.height       || $(this).data("height")        || '349';
  var trackingCategory  = options.category     || $(this).data("category")      || 'youtube';
  var trackingAction    = options.action       || $(this).data("action")        || 'youtube';
  var playerVars        = options.playerVars   || $(this).data("player-vars")   || {rel: 0};
```
