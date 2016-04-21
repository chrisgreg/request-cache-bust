var usingInternetExplorer = require('detectIe');

function with_query_strings (request) {
  request._query = [Date.now().toString()]
  return request
}

module.exports = function _superAgentCacheBust (request, mockIE) {
  request.set('X-Requested-With', 'XMLHttpRequest')
  request.set('Expires', '-1')
  request.set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')

  if (usingInternetExplorer) {
    with_query_strings(request)
  }

  return request
}
