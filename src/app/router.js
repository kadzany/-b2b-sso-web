(function () {
    // Check local storage for login
    const el = $('#app');
    var routingDefinition = {
        'product': 'app/views/product/product.html',
        'product_catalog_list': 'app/views/product_catalog/product_catalog_list.html',
        'pr_list': 'app/views/purchase_req/pr_list.html',
        'pr_approval_list': 'app/views/purchase_req_approval/pr_approval_list.html',
        'po_list': 'app/views/purchase_order/po_list.html',
        'procurement_list': 'app/views/procurement/procurement_list.html'
    };

    // Navigation menu highlighting
    let view = new URL(window.location.href).searchParams.get('view');
    $(`a.item.${view}`).addClass('active');
    appendToIframe(view);

    // View loading, depends on navigation
    function appendToIframe(routeUrl) {
        var templatePath = routingDefinition[routeUrl];
        if (!templatePath) templatePath = "app/views/invalid.html";
        el.html('');
        el.append(`<iframe id="contentIframe" onload="iframeLoaded()" scrolling="no" src="${templatePath}"></iframe>`);
    }
})();