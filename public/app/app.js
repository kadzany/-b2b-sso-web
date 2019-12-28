window.addEventListener('load', () => {
  setTimeout(function () {
    if(!sessionStorage.getItem('token')){
      window.location = 'index.html'
    }
  }, 500);
  // Instantiate api handler
  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
  });
  $('.ui.dropdown').dropdown();
});
