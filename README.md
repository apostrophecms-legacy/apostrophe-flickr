# apostrophe-flickr-sets

apostrophe-flickr-sets is a widget for the [Apostrophe](http://github.com/punkave/apostrophe) content management system. Apostrophe lets you display a set-based Flickr widget in any content area. apostrophe-flickr-sets is particularly named to allow for a more robust apostrophe-flickr module in the future.

## API Key
In order to make calls to the Flickr API, you'll need to have an API token, available [here]("https://www.flickr.com/services/apps/create/"). While Flickr is generous about their rate limit (~3600 queries/hr), we're caching pretty heavily by default (updating every 20 minutes). If you need a shorter caching period, simply pass `lifetime: [# in ms]` to your `apostrophe-flickr-sets` in your app.js.

## TO-DO
- [ ] Publish to NPM
- [ ] Better caching to not kill the API
- [ ] Write some tests?
