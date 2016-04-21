var usingInternetExplorer = function() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    var edge = ua.indexOf('Edge/');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    if (edge > 0) {
       // IE 12 => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function with_query_strings (request) {
  request._query = [Date.now().toString()]
  return request
}

module.exports = function _requestCacheBust (request, mockIE) {
  request.set('X-Requested-With', 'XMLHttpRequest')
  request.set('Expires', '-1')
  request.set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')

  if (usingInternetExplorer()) {
    with_query_strings(request)
  }

  return request
}
