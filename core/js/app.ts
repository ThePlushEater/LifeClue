function mod(n, m) {
    return ((n % m) + m) % m;
}

var isResetting: boolean = false;

function distance(loc1: L.LatLng, loc2: L.LatLng): number {
    return Math.sqrt(Math.pow(loc1.lat - loc2.lat, 2) + Math.pow(loc1.lng - loc2.lng, 2));
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

$(document).ready(function () {
    var url: any = window.location;
    LifeClue.Setting.setBaseUrl(url.origin + window.location.pathname);
    LifeClue.View.setElement({ el: $('#view-main') });
    // start router.
    Backbone.history.start();

    // start updating data.
    if (!isResetting) {
        setTimeout(function () {
            LifeClue.Controller.getInstance().updateFromServer();
        }, 5000);
        
    }
    

    //latitude: 33.77120578006268,    // 33.77107646179546
    //longitude: -84.39197301864624,  // -84.39182281494142

    //console.log(Math.sqrt(Math.pow(33.77120578006268 - 33.77107646179546, 2) + Math.pow(-84.39197301864624 + 84.39182281494142, 2)));
    //console.log(Math.sqrt(Math.pow(33.77120578006268 - 33.77136185357355, 2) + Math.pow(-84.39197301864624 + 84.3918925523758, 2)));
});
