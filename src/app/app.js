if (document.readyState !== 'loading') {
  loadHandler();
} else {
  document.addEventListener('DOMContentLoaded', loadHandler);
}

function loadHandler() {
  setTimeout(function () {
    if(!sessionStorage.getItem('token')){
      window.location = 'index.html';
    }
  }, 500);
  $('.ui.dropdown').dropdown();
  // Instantiate api handler
  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
  });
}

