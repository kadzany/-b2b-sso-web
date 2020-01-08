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

  // Navigation menu highlighting
  let view = new URL(window.location.href).pathname.replace('/','').replace('.html','');
  $(`a.item.${view}`).addClass('active');

  // Logout
  $('#logoutButton').click(function(){
    sessionStorage.clear();
    setTimeout(function (){
        window.location = 'index.html';
    }, 500);
});
})();