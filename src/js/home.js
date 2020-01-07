(function(){
    $('#logoutButton').click(function(){
        sessionStorage.clear();
        setTimeout(function (){
            window.location = 'index.html';
        }, 500);
    });
})();