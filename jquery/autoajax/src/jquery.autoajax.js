/*! autoajax v 0.00 by http://www.knurtsysteme.de
 * License: http://produkte.knurtsysteme.de/license */
console.error('do not use version 0.00!');
if (typeof (jQuery) == 'undefined')
  throw ("require jQuery");
if (typeof (jQuery.serializeObject) == 'undefined')
  throw ("require jQuery.serializeObject");
/**
 * THIS IS JUST AN UNTESTED IDEA BY NOW! simply a ajax request with default
 * values for everything.
 * 
 * as default send json to a server (request.json) and assume this json as
 * answer: { 'succ' : (true|false), 'messages' : ['user updated', 'new username
 * foobar'] }
 * 
 * as default data send jQuery.serializeObject of the document body without any
 * key. grep the input stream on server side to catch the json.
 * 
 * the jQuery.ajax.success function is devided in two different functions: if
 * succ is true or if succ is false.
 * 
 * example (in php): get request and answer in <?php // prepare answer $answer =
 * new stdClass(); $obj->messages = array(); // get request $request =
 * file_get_contents("php://input"); if(isset($request) && strlen($request) > 0) {
 * try { $got = json_decode($submit); // do something smart here $answer->succ =
 * true; $obj->messages[] = 'hossa'; } catch(Exception $e){ // handle exception
 * here $answer->succ = false; $obj->messages[] = 'ooohhhh'; } } // answer
 * header('Content-type: application/json'); die(json_encode($obj)); ?>
 */
$.ajaxSetup({
  type : 'POST',
  url : 'request.json',
  contentType : 'application/json; charset=utf-8',
  dataType : 'json',
  data : escape(JSON.stringify($(document).serializeObject()))
});
(function($) {
  $.fn.autoajax = function(options) {
    $(this).click(function(el) {
      options.actiononsucc = options.actiononsucc || function(r) {
        alert("server action succeeded");
      };
      options.actiononfail = options.actiononfail || function(r) {
        alert("server action failed");
      };
      options.success = options.success || function(r) {
        if (r.succ && r.succ == true) {
          options.actiononsucc(r);
        } else {
          options.actiononfail(r);
        }
      };
      $.ajax(options);
    });
    options = options || {};
  };
})(jQuery);
