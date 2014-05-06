// @class Editor for Flickr Set widgets

function AposFlickrWidgetEditor(options) {
  var self = this;

  if (!options.messages) {
    options.messages = {};
  }
  if (!options.messages.missing) {
    options.messages.missing = 'Paste in a URL for your Flickr set first.';
  }

  self.type = 'flickr';
  options.template = '.apos-flickr-editor';

  AposWidgetEditor.call(self, options);

  // What are these doing?
  // self.prePreview = getSet;
  self.preSave = getSet;

  self.afterCreatingEl = function() {
    self.$setUrl = self.$el.find('[name="set"]');
    self.$setUrl.val(self.data.setUrl);
    self.$limit = self.$el.find('[name="limit"]');
    self.$limit.val(self.data.limit || 10);
    setTimeout(function() {
      self.$setUrl.focus();
      self.$setUrl.setSelection(0, 0);
    }, 500);
  };

  console.log(self);

  function getSet(callback) {
    // console.log("The data say", self.data);
    // console.log("The self says", self);
    self.exists = !!self.$setUrl.val();
    if (self.exists) {
      self.data.setUrl = self.$setUrl.val();
      self.data.limit = self.$limit.val();
    }
    return callback();
  }
}

AposFlickrWidgetEditor.label = 'Flickr Gallery';

apos.addWidgetType('flickr');
