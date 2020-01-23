  // Menu selection
  var userEmail = sessionStorage.getItem('user_email');
  var userRole = sessionStorage.getItem('user_role');

  $(".item_menu").hide();

  if(userRole == "admin"){
      $("#vendor").show();
      $("#register_vendor").hide();
      $("#katalog").show();
      $("#purchasing").show();
      $("#shopping_cart").show();
      $("#kontrak").show();
      $("#user").show();
      $("#approver").show();
      $("#officer").show();
  }
  else if(userRole == "vendor"){
      $("#kontrak").show();
      $("#vendor").show();
      $("#katalog").show();
      $("#register_alert").show();
  }
  else if(userRole == "customer"){
      $("#katalog").show();
      $("#purchasing").show();
      $("#shopping_cart").show();
  }

(function () {
  if (!sessionStorage.getItem('token')) {
    if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
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
