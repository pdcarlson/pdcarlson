// The site is a static export with trailingSlash on, so every page lives at
// <route>/index.html in the bucket. CloudFront only fills in index.html for
// "/", so without this every page except the homepage is a 404.

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.charAt(uri.length - 1) === '/') {
    request.uri = uri + 'index.html';
    return request;
  }

  var last = uri.substring(uri.lastIndexOf('/') + 1);

  // real files: hashed js and css, /assets/*, favicon.ico
  if (last.indexOf('.') !== -1) {
    return request;
  }

  // the social cards are files with no extension, not pages
  if (last.indexOf('opengraph-image') === 0) {
    return request;
  }

  // /resume works the same as /resume/
  request.uri = uri + '/index.html';
  return request;
}
