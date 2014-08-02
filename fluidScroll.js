/*
 * JQuery Scroll plugin
 *
 * This plugin, when run, will go through the DOM and will add onclick attributes
 * that will scroll the page to a particular section.  It will then remove the
 * href attributes to prevent an initial flash of the new section before the scroll
 * occurs.
 *
 * It will also accept an optional selector which will limit the search to the children
 * of a particular class or id.
 */

'use strict';

(function($) {

  /**
   * This jQuery plugin iterates through a collection and binds a fluid scroll behavior
   * to anchor links.
   * @author  Tyler Tretsven
   * @param   {object}    options  'The configuration options'
   * */
  $.fn.fluidScroll = function(options) {

    // Default configuration options
    var _config = {

      // milliseconds
      duration: 400,

      // linear or swing
      easing: 'swing'
    };

    /**
     * Apply configuration options if provided
     * */
    if(typeof options === "object") {
      $.extend(_config, options);
    }

    /**
     * Stores a reference to the jQuery object used to scroll the view
     * @type  {jQuery}
     * */
    var documentCache = $('html, body');

    /**
     * Returns true if a link is an anchor.
     * @param   {String}  link  'The target link'
     * @return  {boolean}
     * */
    function isAnchor(link) {

      var
        // Ex.: #A, #abc, #a-b, #A-B, #a123
        validPlural = /^#[a-zA-Z][a-zA-Z0-9_-]+/,

        // Ex.: #A, #a
        validSingular = /^#[a-zA-Z]/;

      return validPlural.test(link) || validSingular.test(link);
    }

    /**
     * Gets the height location of an anchored element
     * @param  {String}  id  'HTML element id'
     * */
    function getYLocationOfElement(id) {
      return document.getElementById(id).offsetTop;
    }

    /**
     *
     *
     * */
    return this.each(function() {

      // Retrieves the target link
      var link = $(this).attr('href');

      // RegExp tests whether the link is an anchor.
      if ( isAnchor(link) ){

        // If true, the hash is removed and the target location is set.
        var
          href = link.split('#')[1],
          location = getYLocationOfElement(href);

      } else {

        // If false, it returns and continues the the next link
        return;
      }

      //
      $(this).bind("click", function(e) {

        // Scrolls the view to the top of the target element
        documentCache.animate(
          { scrollTop: location },
          _config.duration,
          _config.easing
        );

        // Prevents a flash of the new element before the scroll
        e.preventDefault();
      });
    });
  };

})(jQuery);


/* Usage Example */

var options = {
  duration: 1000, // ms
  easing: 'swing' // Swing or Linear
};

$('a').fluidScroll(options);