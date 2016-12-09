//var Flickr = require('flickrapi');
var extend = require('extend');
var _ = require('lodash');
var cache = {};
var request = require('request');

module.exports = function(options, callback) {
  return new Construct(options, callback);
};

module.exports.Construct = Construct;

function Construct(options, callback) {
  var apos = options.apos;
  var app = options.app;

  //var flickr = new Flickr({"api_key": options.flickrKey});
  var self = this;
  self._apos = apos;
  self._app = app;
  var lifetime = options.lifetime ? options.lifetime : (60000*20);
  var flickrOptions = {
    api_key: options.flickrKey,
    secret: options.flickrSecret,
    size: options.size
  }
  self._apos.mixinModuleAssets(self, 'flickr', __dirname, options);


  // This widget should be part of the default set of widgets for areas
  // (this isn't mandatory)
  apos.defaultControls.push('flickr');

  // Include our editor template in the markup when aposTemplates is called
  self.pushAsset('template', 'flickrEditor', { when: 'user' });
  //self.pushAsset('template', 'flickr', { when: 'always' });

  // Make sure that aposScripts and aposStylesheets summon our assets

  // We need the editor for RSS feeds. (TODO: consider separate script lists for
  // resources needed also by non-editing users.)
  self.pushAsset('script', 'editor', { when: 'user' });
  self.pushAsset('script', 'content', { when: 'always' });
  self.pushAsset('stylesheet', 'content', { when: 'always' });

  self.widget = true;
  self.label = options.label || 'Flickr';
  self.css = options.css || 'flickr';
  self.icon = options.icon || 'icon-flickr';

  self.sanitize = function(item) {
    // Check here for Flickery-ness of the url.
    if (!item.setUrl.match(/^https?\:\/\//)) {
      item.setUrl = 'https://' + item.setUrl;
    }
    item.limit = parseInt(item.limit, 10);
  };

  self.renderWidget = function(data) {
    return self.render('flickr', data);
  };

  self.setSize = function(sizeName){
    var sizeUrl;
    if(sizeName === 'Square'){
      sizeUrl = '_s';
    } else if (sizeName === 'Large Square'){
      sizeUrl = '_q';
    } else if (sizeName === 'Thumbnail'){
      sizeUrl = '_t';
    } else if (sizeName === 'Small'){
      sizeUrl = '_m';
    } else if (sizeName === 'Small 320'){
      sizeUrl = '_n';
    } else if (sizeName === 'Medium'){
      sizeUrl = '';
    } else if (sizeName === 'Medium 640'){
      sizeUrl = '_z';
    } else if (sizeName === 'Medium 800'){
      sizeUrl = '_c';
    } else if (sizeName === 'Large'){
      sizeUrl = '_b';
    } else if (sizeName === 'Original'){
      sizeUrl = '_o';
    } else {
      sizeUrl = '';
    }
    return sizeUrl;
  }

  app.get('/apos-flickr/feed', function(req, res){
    var item = {};

    if (!req.query.id) {
      item._failed = true;
      return res.send(404);
    }
    item.setId = req.query.id;
    item.limit = req.query.limit;
    item.showDescription = req.query.showDescription
    item._photos = [];

    var now = new Date();
    // Take all properties into account, not just the feed, so the cache
    // doesn't prevent us from seeing a change in the limit property right away
    var key = JSON.stringify({ setId: item.setId, limit: item.limit, showDescrption: item.showDescription });
    if (cache.hasOwnProperty(key) && ((cache[key].when + lifetime) > now.getTime())) {
      item._photos = cache[key].data;
      return res.json(item._photos);
    }

    if (self._apos._aposLocals.offline) {
      item._failed = true;
      return res.send(404);
    }

    // Let's build out the Flickr API request
    var flickrUrl = "https://api.flickr.com/services/rest/?"
                    + "&method=flickr.photosets.getPhotos"
                    + "&api_key="+options.flickrKey
                    + "&format=json&nojsoncallback=1"
                    + "&photoset_id="+item.setId
                    + "&extras=url_m,description"
                    + "&privacy_filter=1"
                    + "&per_page="+ item.limit;

    request(flickrUrl, function(error, response, body){
      if (!error && response.statusCode == 200) {
        var flickrResponse = JSON.parse(body);
        _.each((flickrResponse && flickrResponse.photoset && flickrResponse.photoset.photo) || [], function(photo){
          var photoUrlString = (photo.url_l || "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+ self.setSize(options.size)+".jpg");
          var photoObj;
          if (item.showDescription){
            photoObj = {url: photoUrlString, description: photo.description};
          } else {
            photoObj = {url: photoUrlString}
          }
          item._photos.push(photoObj);
        });
        cache[key] = { when: now.getTime(), data: item._photos };
        return res.json(item._photos);
      }
    });
  });

  self._apos.addWidgetType('flickr', self);

  return setImmediate(function() { return callback(null); });
}
