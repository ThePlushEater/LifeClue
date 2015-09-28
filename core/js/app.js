function mod(n, m) {
    return ((n % m) + m) % m;
}
var isResetting = false;
function distance(loc1, loc2) {
    return Math.sqrt(Math.pow(loc1.lat - loc2.lat, 2) + Math.pow(loc1.lng - loc2.lng, 2));
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
$(document).ready(function () {
    var url = window.location;
    LifeClue.Setting.setBaseUrl(url.origin + window.location.pathname);
    LifeClue.View.setElement({ el: $('#view-main') });
    Backbone.history.start();
    if (!isResetting) {
        setTimeout(function () {
            LifeClue.Controller.getInstance().updateFromServer();
        }, 5000);
    }
});
