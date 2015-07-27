(function(){

  hopscotch.highlight = {

    getStep: function() {
      var stepNo = hopscotch.getCurrStepNum();
      return window.tour.steps[stepNo];
    },

    getTarget: function(step) {
      var target = step.target;
      return $(typeof target === 'string' ? '#' + target : target);
    },

    show: function() {
      var step = hopscotch.highlight.getStep();
      var target = hopscotch.highlight.getTarget(step);

      target.addClass('hopscotch-highlighted');

      hopscotch.highlight.showHighlight(target, step.table);
      hopscotch.highlight.showOverlay();
    },

    remove: function() {
      $('.hopscotch-highlighted').removeClass('hopscotch-highlighted');
      $('#hopscotch-overlay, #hopscotch-highlight').remove();
    },

    showHighlight: function(el, table) {

      hopscotch.highlight.positionHighlight(el, table);

      // Highlight entire table column
      if (typeof table !== 'undefined') {
        // Bring each cell to foreground
        var i = el.index();
        el.closest('table').find('tbody tr').each(function() {
          $(this).find('td').eq(i).addClass('hopscotch-highlighted');
        });
      }
    },

    positionHighlight: function(el, table) {
      var h = $('<div/>').attr('id', 'hopscotch-highlight').appendTo('body');

      h.css({
        'top': el.offset().top,
        'left': el.offset().left,
        'width': el.outerWidth(),
        'height': el.outerHeight()
      });

      if (typeof table !== 'undefined') {
        // Resize highlight to column height
        h.css('height', el.closest('table').height());
      }
    },

    showOverlay: function() {
      $('<div/>').attr('id', 'hopscotch-overlay').appendTo('body');
    }

  };

  window.onresize = function() {
    // reposition highlight
    var step = hopscotch.highlight.getStep();
    var target = hopscotch.highlight.getTarget(step);
    hopscotch.highlight.positionHighlight(target, step.table);
  };

})();
