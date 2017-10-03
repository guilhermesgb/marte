(function(document, history, location) {
  var HISTORY_SUPPORT = !!(history && history.pushState);

  var anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,

    /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function() {
      var self = this;
      setTimeout(function() {
        self.scrollToCurrent(false, self);
      }, 600);
      $(window).on('hashchange', $.proxy(this, 'scrollToCurrent'));
      $('body').on('click', 'a', $.proxy(this, 'delegateAnchors'));
    },

    /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function() {
      return $('.floatter').height() + 20;
    },

    scrollAgain: function(id, pushToHistory, getFixedOffset) {
      match = document.getElementById(id);

      if(match) {
        anchorOffset = $(match).offset().top - getFixedOffset();
        $('html, body').animate({ scrollTop: anchorOffset});

        $('.highlighted').removeClass("highlighted");
        $('#' + $(match)[0].id).addClass("highlighted");

        // Add the state to history as-per normal anchor links
        if(HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }
    },

    /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function(href, pushToHistory, self) {
      var match, anchorOffset;

      var ANCHOR_REGEX = this.ANCHOR_REGEX;
      if (!ANCHOR_REGEX) {
        ANCHOR_REGEX = self.ANCHOR_REGEX;
      }

      if(!ANCHOR_REGEX.test(href)) {
        return false;
      }

      id = href.slice(1);
      if (id.indexOf('?') != -1){
        id = id.slice(0, id.length - (id.length - id.indexOf('?')))
      }
      match = document.getElementById(id);

      if(match) {
        var getFixedOffset = this.getFixedOffset;
        if (!getFixedOffset) {
          getFixedOffset = self.getFixedOffset;
        }
        anchorOffset = $(match).offset().top - getFixedOffset();
        $('html, body').animate({ scrollTop: anchorOffset});

        $('.highlighted').removeClass("highlighted");
        if ($(match)[0].id && $('#' + $(match)[0].id + ':has(img)')) {
          $('#' + $(match)[0].id + ':has(img)').addClass("highlighted");
        }

        if ($(match)[0].id === 'horarios' && _isotopeView) {
          var scrollAgain = this.scrollAgain;
          if (!scrollAgain) {
            scrollAgain = self.scrollAgain;
          }
          var desiredId = desiredId = window.location.hash.replace("#horarios?","");
          window.setTimeout(function(){
            for (entry in _isotopeView.entries) {
              entry = _isotopeView.entries[entry];
              if (entry.id === desiredId) {
                selectDay(parseInt(entry.date));
                window.setTimeout(function(){
                  scrollAgain(desiredId, true, getFixedOffset);
                }, 400);
              }
            }
          }, 600);
          return true;
        }

        // Add the state to history as-per normal anchor links
        if(HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }

      return !!match;
    },

    /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function(e, self) {
      var actualSelf, scrollIfAnchor;
      if (this) {
        actualSelf = this;
      } else if (self) {
        actualSelf = self;
      } else {
        return;
      }
      var scrollIfAnchor = this.scrollIfAnchor;
      if (!scrollIfAnchor){
        scrollIfAnchor = self.scrollIfAnchor;
      }
      if (!scrollIfAnchor) {
        return;
      }
      if(scrollIfAnchor(window.location.hash, false, actualSelf) && e) {
      	e.preventDefault();
      }
    },

    /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function(e) {
      var elem = e.target;
      if(this.scrollIfAnchor(elem.getAttribute('href'), true, this)) {
        e.preventDefault();
      }
    }
  };

	$(window).on("load", $.proxy(anchorScrolls, 'init'));
})(window.document, window.history, window.location);
