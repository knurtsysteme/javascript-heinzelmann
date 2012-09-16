/*! serializeObject v 0.00 by http://www.knurtsysteme.de
 * License: MIT License */
console.error('do not use version 0.00!');
if (typeof (jQuery) == 'undefined')
  throw ("require jQuery");
/**
 * put an object into form fields.
 */
(function($) {

  function FillInController(params) {
    var count = 0;
    var val = null;
    function isChecked(value) {
      return typeof (value) == 'string' && value.length > 0;
    }
    this.fillIn = function() {
      for ( var key in params) {
        if (params.hasOwnProperty(key)) {
          val = params[key];
          target = $('*[name=' + key + ']');
          $('input[type=checkbox][name=' + key + ']').each(function(i, e) {
            $(e).attr('checked', isChecked(val));
            count++;
          });
          $('input[type=radio][name=' + key + '][value=' + val + ']').each(function(i, e) {
            $(e).attr('checked', true);
            count++;
          });
          $('input[name=' + key + ']:not([type=checkbox]):not([type=radio])').each(function(i, e) {
            $(e).val(val);
            count++;
          });
          $('textarea[name=' + key + ']').each(function(i, e) {
            $(e).html(val ? val : '');
            count++;
          });
          $('select[name=' + key + ']').each(function(i, e) {
            $(e).val(val);
            count++;
          });
        }
      }
    };
    this.getCount = function() {
      return count;
    };
  }

  $.fn.fillIn = function(params) {
    var fic = new FillInController(params);
    fic.fillIn();
    return fic.getCount();
  };
})(jQuery);
