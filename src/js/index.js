(function () {
    $('#loginButton').click(function () {
        // need to be removed later
        window.location = 'home.html';
        sessionStorage.setItem('token', 'asdfg');

        const form = document.forms.loginForm;

        if (!form) return;

        window.api.post('/authentication_token', {
            email: form.elements.email.value,
            password: form.elements.password.value
        }).then(
            function (res) {
                if (res) {
                    window.location = 'katalog_produk.html';
                    sessionStorage.setItem('token', res.token);
                }
            }
        );
    });
})();
