# apostrophe-flickr
[![NPM](https://nodei.co/npm/apostrophe-flickr-sets.png?downloads=true)](https://nodei.co/npm/apostrophe-flickr-sets/)

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/jquery-bottomless/master/logos/logo-box-madefor.png" align="right" /></a>
apostrophe-flickr is a widget for the [Apostrophe](http://github.com/punkave/apostrophe) content management system. Apostrophe lets you display a set-based Flickr widget in any content area. apostrophe-flickr is particularly named to allow for a more robust apostrophe-flickr module in the future.

## API Key
In order to make calls to the Flickr API, you'll need to have an API token, available [here]("https://www.flickr.com/services/apps/create/"). While Flickr is generous about their rate limit (~3600 queries/hr), we're caching pretty heavily by default (updating every 20 minutes). If you need a shorter caching period, simply pass `lifetime: [# in ms]` to your `apostrophe-flickr` in your app.js.

## TO-DO
- [x] Publish to NPM
- [x] Better caching to not kill the API
- [ ] Write some tests?

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-bottomless/master/logos/logo-box-builtby.png" /></a>
