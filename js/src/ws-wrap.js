/*! wrapWs v 0.00 by http://www.knurtsysteme.de
 * License: MIT License */
/**
 * a simple wrapper for websockets to make use easier. put out an info "browser
 * outdated" message (on console) by checking every 3 seconds if connection is
 * still ready. try to convert incoming messages to JSON. do not care about the
 * message event, you get the message.data as first and the messageevent itself
 * as second parameter (if you need to).
 * 
 * example usage:
 * 
 * <pre>
 * wrapWs('ws://localhost').onmessage(function(message) {
 *   alert(message);
 * });
 * </pre>
 */
var wrapWs = function(url, connectionerror) {
  var goneExecuted = false;
  connectionerror = connectionerror || function() {
    console.error('browser outdated');
  };
  window.WebSocket = window.WebSocket || window.MozWebSocket;
  var connection = false;
  if (!window.WebSocket) {
    connectionerror();
  } else {
    connection = new WebSocket(url);
  }
  var result = {};
  var callbackWrapper = function(callback) {
    return function(message) {
      if (connection) {
        var data = false;
        if (message && message.data) {
          data = message.data;
          if (typeof data == 'string') {
            try {
              data = JSON.parse(data);
            } catch (e) {
            }
          }
        }
        callback(data, message);
      }
    };
  }
  result.wsgone = function(callback) {
    if (connection) {
      setInterval(function() {
        if (connection.readyState !== 1 && !goneExecuted) {
          callback();
          goneExecuted = true;
        }
      }, 3000);
    }
    return result;
  };
  result.onopen = function(callback) {
    connection.onopen = callbackWrapper(callback);
    return result;
  };
  result.onerror = function(callback) {
    connection.onerror = callbackWrapper(callback);
    return result;
  };
  result.onmessage = function(callback) {
    connection.onmessage = callbackWrapper(callback);
    return result;
  }
  return result;
};