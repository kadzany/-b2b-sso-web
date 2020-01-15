(function () {
    $('#loginButton').click(function () {
        const form = document.forms.loginForm;

        if (!form) return;

        // need to be removed later
        window.location = 'home.html';
        sessionStorage.setItem('token', 'asdfg');
        sessionStorage.setItem('user_email', form.elements.email.value);
        sessionStorage.setItem('user_role', form.elements.role.value);

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
