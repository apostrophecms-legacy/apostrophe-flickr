apos.widgetPlayers.flickr = function($el) {
  var data = apos.getWidgetData($el);

  var getSetId = function(url){
    var tempId = url.match(/sets\/([0-9]+)/);
    return tempId[1];
  }

  var limit = data.limit;
  var id = getSetId(data.setUrl);

  $.ajax({
    dataType: "json",
    url: '/apos-flickr/feed',
    data: {id: id, limit: limit},
    success: function(photos){

      //Define our photos object as well as the template and loader.
      var $photos = $el.find('[data-apos-flickr-photos]'),
          $photoTemplate = $photos.find('[data-template]'),
          $loader = $photos.find('[data-apos-flickr-loader]');

      if (!photos.length) {
        $el.trigger('aposFlickrNull');
        return;
      }

      function init(){
        generatePhotoMarkup(photos);
      }

      function removeTemplate(){
        $photoTemplate.remove();
      };

      function buildTemplate($template){
        $template.$image = $template.find('[data-apos-flickr-image]');
        return $template;
      }

      function cloneTemplate($obj){
        $clone = $obj.clone();
        $clone.removeAttr('data-template');
        clone = buildTemplate($clone);
        return clone;
      }

      function generatePhotoMarkup(photos){
        _.each(photos, function(photo){
          //Clone our Template
          var $photo = cloneTemplate($photoTemplate);

          //Add Photo background and image src.
          $photo.css('background-image', photo);
          $photo.$image.attr('src', photo);

          //If there's still a loader, kill it.
          $loader.remove();

          //Add That to the List
          $photos.append($photo);
        });
        removeTemplate();

        //Need to add a hook in here to create project-specific galleries.
        apos.widgetPlayers.flickr.afterLoad($el, $photos);
      };


      init();
    }
  });
}
apos.widgetPlayers.flickr.afterLoad = function($el, $photos){
  //This is just a simple implementation of projector to get you
  // up and running with a Flickr widget.
  $photos.find('li').eq(0).addClass('apos-current');
  $el.imagesReady(function(){
    $el.projector();
  });
};
