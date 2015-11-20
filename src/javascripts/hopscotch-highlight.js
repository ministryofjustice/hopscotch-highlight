/* global exports, require */

'use strict';

var hopscotch = require('hopscotch');
var $ = require('jquery');


exports.hopscotchHighlight = {

  getStep: function() {
    var stepNo = hopscotch.getCurrStepNum();

    if (stepNo === undefined) {
      return;
    } else {
      return window.tour.steps[stepNo];
    }
  },

  getTarget: function(step) {
    var target = step.target;
    return $(typeof target === 'string' ? '#' + target : target);
  },

  show: function() {
    var step = this.getStep();
    var target = this.getTarget(step);

    target.addClass('hopscotch-highlighted');

    this.showHighlight(target, step.table);
    this.showOverlay();
  },

  remove: function() {
    $('.hopscotch-highlighted').removeClass('hopscotch-highlighted');
    $('#hopscotch-overlay, #hopscotch-highlight').remove();
  },

  showHighlight: function(el, table) {
    this.positionHighlight(el, table);

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
    var id = 'hopscotch-highlight';
    var h = $('#' + id).length ? $('#' + id) : $('<div/>').attr('id', id);

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

    h.appendTo('body');
  },

  showOverlay: function() {
    $('<div/>').attr('id', 'hopscotch-overlay').appendTo('body');
  },

  onresize: function() {
    // reposition highlight
    var step = this.getStep();

    if (step && hopscotch.isActive) {
      var target = this.getTarget(step);
      this.positionHighlight(target, step.table);
    }

  }
};
