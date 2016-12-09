# apostrophe-flickr
[![NPM](https://nodei.co/npm/apostrophe-flickr.png?downloads=true)](https://nodei.co/npm/apostrophe-flickr/)

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/jquery-bottomless/master/logos/logo-box-madefor.png" align="right" /></a>
apostrophe-flickr is a widget for the [Apostrophe](http://github.com/punkave/apostrophe) content management system. Apostrophe lets you display a set-based Flickr widget in any content area. apostrophe-flickr is particularly named to allow for a more robust apostrophe-flickr module in the future.

## Configuration in App.js
### API Key
In order to make calls to the Flickr API, you'll need to have an API token, available [here]("https://www.flickr.com/services/apps/create/"). While Flickr is generous about their rate limit (~3600 queries/hr), we're caching pretty heavily by default (updating every 20 minutes). If you need a shorter caching period, simply pass `lifetime: [# in ms]` to your `apostrophe-flickr` in your app.js.

### Sizes
You may need to determine a specific size of image that you want back from Flickr, and an option in app.js uses the labels available within Flickr. You can check out those names listed in the response labels [here]("https://www.flickr.com/services/api/flickr.photos.getSizes.html"). For instance, if I want the Large Square option as listed in the API documentation, I simply need to pass `size: 'Large Square'` and the Flickr widget will grab the appropriate size.

### Example
``` javascript
'apostrophe-flickr': {
  //Actual key and secret here
  flickrKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  flickrSecret: 'xxxxxxxxxxxxxxxxx',
  // Define your image size here
  size: 'Medium 640'
},
```

## Templates & Client Side JS
### Templates
You can overide the default templates at the project level for the Apostorph Flickr module by adding an `apostrophe-flickr` module to `/lib/modules`. There, you can override both the viewing template, `flickr.html` as well as `flickrEditor.html`.

### Client Side JS
Most of the template-building logic for Apostrophe Flickr happens in `/public/js/content.js` and so you can override that at the project level as well. What is likely more useful, however, is a convenience method already attached to the `apos.widgetPlayers.flickr` object, namely `afterLoad`. At any point in your project's client side JS, simply override  `apos.widgetPlayers.flickr.afterLoad` and add any slideshow or viewer logic there.

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-bottomless/master/logos/logo-box-builtby.png" /></a>
