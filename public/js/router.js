(function () {
    const el = $('#app');


    // Router Declaration
    const router = new Router({
        mode: 'history',
        page404: (path) => {
            const html = $('#error-template').html()
            el.html(html);
        },
    });

    router.add('/', () => {
        el.html('');
        console.log('home');
    });        

    router.add('/contract-list', () => {
        el.html('');
        console.log('contract list');
    });

    router.add('/product-catalog', () => {
        el.html('');
        console.log('product catalog');
    });

    // Navigate app to current url
    router.navigateTo(window.location.pathname);

    // Highlight Active Menu on Refresh/Page Reload
    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');

    $('a').on('click', (event) => {
        // Block browser page load
        event.preventDefault();

        // Highlight Active Menu on Click
        const target = $(event.target);

        if(target[0].nodeName == 'IMG'){
            router.navigateTo('/');
            return;
        }

        $('.item').removeClass('active');
        target.addClass('active');

        // Navigate to clicked url
        const href = target.attr('href');
        if(!href) {
            router.navigateTo('/invalid');
            return;
        }
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
    });

})();