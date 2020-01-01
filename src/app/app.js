(function () {
  if (!sessionStorage.getItem('token')) {
    if (window.location.pathname != '/index.html' && window.location.pathname != '/') {
      window.location.pathname = '/index.html';
    }
  }

  // Instantiate semantic dropdown
  $('.ui.dropdown').dropdown();

  // Instantiate api handler
  window.api = axios.create({
    baseURL: window.config.baseURL,
    timeout: 5000,
  });

  // Iframe management
  window.iframeLoaded = function () {
    var iframeId = document.getElementById('contentIframe');
    if (iframeId) {
      // here you can make the height, I delete it first, then I make it again
      iframeId.height = "";
      iframeId.height = (iframeId.contentWindow.document.body.scrollHeight * 2) + "px";
    }
  }
})();