jQuery.youtube.js
=================

Provides an easy to use wrapper around GA tracking for YouTube videos that allow you never have to type any JavaScript.

``` html
<div class="ga-youtube" data-youtube-id="33jb2Ns7yaQ" data-width="620" data-height="349" data-category="Example" data-action="LSUI"></div>
```

``` javascript
_trackEvent(category, action, opt_label, opt_value, opt_noninteraction)
```

The only mandatory fields are the class ga-youtube, and data-youtube-id.

This also triggers an event you can listen for elsewhere by binding to the ID of the video:

``` javascript
  $("#"+elementId).trigger("started");
```
