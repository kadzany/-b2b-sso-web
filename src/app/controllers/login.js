(function () {
    $('#loginButton').click(function () {
        const form = document.forms['loginForm'];

        if (!form) return;

        window.api.post('/authentication_token', {
            email: form.elements['email'].value,
            password: form.elements['password'].value
        }).then(
            function (res) {
                if (res) {
                    window.location = 'home.html';
                    sessionStorage.setItem('token', res.token);
                }
            }
        );

    });
})();