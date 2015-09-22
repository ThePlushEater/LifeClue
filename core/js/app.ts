function mod(n, m) {
    return ((n % m) + m) % m;
}

$(document).ready(function () {
    var url: any = window.location;
    FruitParent.Setting.setBaseUrl(url.origin + window.location.pathname);
    FruitParent.View.setElement({ el: $('#view-main') });
    
});
