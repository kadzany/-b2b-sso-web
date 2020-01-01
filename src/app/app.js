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
})();