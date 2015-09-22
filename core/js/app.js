function mod(n, m) {
    return ((n % m) + m) % m;
}
$(document).ready(function () {
    var url = window.location;
    FruitParent.Setting.setBaseUrl(url.origin + window.location.pathname);
    FruitParent.View.setElement({ el: $('#view-main') });
});
//# sourceMappingURL=app.js.map