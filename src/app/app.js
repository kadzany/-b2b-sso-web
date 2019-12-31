(function () {
  setTimeout(function () {
    if (!sessionStorage.getItem('token')) {
      if (window.location !== 'index.html') {
        window.location = 'index.html';
      }
    }
  }, 500);
  $('.ui.dropdown').dropdown();
  // Instantiate api handler
  window.api = axios.create({
    baseURL: window.config.baseURL,
    timeout: 5000,
  });
})();