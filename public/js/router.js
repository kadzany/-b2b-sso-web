(function () {
    const el = $('#app');
    
    // Router Declaration
    const routingDefinition = {
        '/': null,
        '/contract-list': 'pages/seller/contract_list.html',
        '/product-catalog': 'pages/seller/product_catalog.html'
    };

    const router = new Router({
        mode: 'history',
        page404: () => {
            const html = $('#error-template').html()
            el.html(html);
        },
    });

    router.add('/', () => {
        appendToIframe('/');
    });        

    router.add('/contract-list', () => {
       appendToIframe('/contract-list'); 
    });

    router.add('/product-catalog', () => {
        appendToIframe('/product-catalog'); 
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

    function appendToIframe(routeUrl){
        var templatePath = routingDefinition[routeUrl];
        if(!templatePath) {
            el.html('');
            return;
        }
        el.html('');
        el.append(`<iframe src="${templatePath}"></iframe>`);        
        console.log(routeUrl);
    }

})();