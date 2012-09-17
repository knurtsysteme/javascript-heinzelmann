/*! serializeObject v 0.00 by http://www.knurtsysteme.de
 * License: MIT License */

if (typeof jQuery == 'undefined')
  throw ("require jQuery");

/**
 * put an object into form fields.
 */
(function($) {

  /**
   * control fillining in the form
   */
  function FillInController(params) {
    var count = 0;
    var val = null;
    function isChecked(value) {
      return typeof value == 'string' && value.length > 0 || typeof value == 'number' && value > 0;
    }

    function getVal(params, key) {
      var result = params[key];      
      var tmp = [];
      if(typeof(result) == 'object') {
        for ( var innerKey in result) {
          if (result.hasOwnProperty(innerKey)) {
            tmp.push(result[innerKey]);
          }
        }
        result = tmp;
      }
      return result;
    }

    /**
     * fill the given params (see constructor) 
     * into the form where the name of a form field
     * is a key of the param and the object value is
     * the input value.
     * ignore all other fields (not mentioned in object).
     */
    this.fillIn = function() {
      for ( var key in params) {
        if (params.hasOwnProperty(key)) {
          val = getVal(params, key);
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
