var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LifeClue;
(function (LifeClue) {
    (function (WingViewType) {
        WingViewType[WingViewType["NONE"] = 0] = "NONE";
        WingViewType[WingViewType["SELECTCHARACTER"] = 1] = "SELECTCHARACTER";
        WingViewType[WingViewType["NOTE"] = 2] = "NOTE";
        WingViewType[WingViewType["SHOWCARD"] = 3] = "SHOWCARD";
    })(LifeClue.WingViewType || (LifeClue.WingViewType = {}));
    var WingViewType = LifeClue.WingViewType;
    var WingView = (function (_super) {
        __extends(WingView, _super);
        function WingView(viewType, options) {
            _super.call(this, options);
            var that = this;
            that.setElement(options.el);
            that.viewType = viewType;
        }
        WingView.prototype.render = function () {
            var that = this;
            if (that.viewType == 1 /* SELECTCHARACTER */) {
                that.$el.css({
                    height: $('#panel-body').height(),
                });
                var template = _.template(LifeClue.Setting.getInstance().getWingCharacterSelectTemplate());
                var data = {
                    "detect": LifeClue.Setting.getInstance().getDetectGeoLocationText(),
                    "select": LifeClue.Setting.getInstance().getSelectYourCharacterText(),
                    "message": LifeClue.Setting.getInstance().nonAvailableText(),
                    "character1": LifeClue.Setting.getInstance().getCharacter1Name(),
                    "character2": LifeClue.Setting.getInstance().getCharacter2Name(),
                    "character3": LifeClue.Setting.getInstance().getCharacter3Name(),
                    "character4": LifeClue.Setting.getInstance().getCharacter4Name(),
                    "character5": LifeClue.Setting.getInstance().getCharacter5Name(),
                    "character6": LifeClue.Setting.getInstance().getCharacter6Name(),
                    "start": LifeClue.Setting.getInstance().getStartGameText(),
                };
                that.$el.html(template(data));
                LifeClue.View.getInstance().setStatusMessage('Welcome to <b>LifeClue</b>. Please select your character.');
                that.addEventListener();
            }
            else if (that.viewType == 2 /* NOTE */) {
                setTimeout(function () {
                    var template = _.template(LifeClue.Setting.getInstance().getWingPlayNoteTemplate());
                    var data2 = {
                        "location": LifeClue.Setting.getInstance().getClaimLocationText(),
                        "locations": LifeClue.Controller.getInstance().getLocations(),
                        "characters": LifeClue.Controller.getInstance().getCharacters(),
                        "weapons": LifeClue.Controller.getInstance().getWeapons(),
                    };
                    that.$el.html(template(data2));
                    that.addEventListener();
                }, 500);
            }
            that.show();
            that.$el.css({
                height: $('#panel-body').height(),
            });
        };
        WingView.prototype.update = function () {
            var that = this;
            var game = LifeClue.Controller.getInstance().getGame();
            if (that.viewType == 1 /* SELECTCHARACTER */) {
                if (game != undefined) {
                    for (var i = 1; i <= 6; i++) {
                        if (game.get('c' + i + 's') == 0) {
                            that.$('#c' + i + 's').removeClass('disabled');
                            that.$('#c' + i + 's').removeClass('selected');
                        }
                        else if (LifeClue.Controller.getInstance().getCharacterId() == 'c' + i + 's') {
                            that.$('#c' + i + 's').removeClass('disabled');
                            that.$('#c' + i + 's').addClass('selected');
                            that.setMessage("You selected '" + that.$('#c' + i + 's').html() + "'");
                            LifeClue.View.getInstance().setStatusMessage("You selected '" + that.$('#c' + i + 's').html() + "'");
                        }
                        else {
                            that.$('#c' + i + 's').addClass('disabled');
                            that.$('#c' + i + 's').removeClass('selected');
                        }
                    }
                    if (LifeClue.Controller.getInstance().getCharacterId() == 'c6s') {
                        that.$('#start-game').removeClass('hidden');
                    }
                    else {
                        that.$('#start-game').addClass('hidden');
                    }
                }
            }
            else if (that.viewType == 2 /* NOTE */) {
            }
        };
        WingView.prototype.setMessage = function (msg) {
            var that = this;
            that.$('#message').html(msg);
        };
        WingView.prototype.show = function () {
            var that = this;
            clearTimeout(that.timeOut);
            that.$el.removeClass('hidden');
            that.timeOut = setTimeout(function () {
                that.$el.addClass('show');
            }, LifeClue.Setting.getInstance().getWingViewShowDelay());
            that.bActive = true;
        };
        WingView.prototype.hide = function () {
            var that = this;
            that.bActive = false;
            clearTimeout(that.timeOut);
            that.$el.removeClass('show');
            that.timeOut = setTimeout(function () {
                that.$el.addClass('hidden');
            }, LifeClue.Setting.getInstance().getWingViewShowDelay());
        };
        WingView.prototype.getIsActive = function () {
            return this.bActive;
        };
        WingView.prototype.getClosestLocation = function () {
            var locations = LifeClue.Controller.getInstance().getLocations();
            var curLoctation = LifeClue.View.getInstance().getMapView().getLocation();
            var closestLocation = locations.models[0];
            var closestDistance = distance(curLoctation, new L.LatLng(closestLocation.get("latitude"), closestLocation.get("longitude")));
            if (locations != undefined) {
                $.each(locations.models, function (index, model) {
                    var tempDistance = distance(curLoctation, new L.LatLng(model.get("latitude"), model.get("longitude")));
                    if (tempDistance < closestDistance) {
                        closestLocation = model;
                        closestDistance = tempDistance;
                    }
                });
            }
            return closestLocation;
        };
        WingView.prototype.getIsLocationCloseEnough = function (location) {
            var curLoctation = LifeClue.View.getInstance().getMapView().getLocation();
            var closestDistance = distance(curLoctation, new L.LatLng(location.get("latitude"), location.get("longitude")));
            if (closestDistance < location.get("radius")) {
                return true;
            }
            return false;
        };
        WingView.prototype.addEventListener = function () {
            var that = this;
            that.$('#finish-turn').off('click');
            that.$('#finish-turn').on('click', function () {
                that.$('#finish-turn').off('click');
                $.ajax({
                    timeout: 10000,
                    url: LifeClue.Setting.getPhpDir() + "finishturn.php",
                    type: "POST",
                    data: {
                        id: 1,
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data == 1) {
                            LifeClue.View.getInstance().setStatusMessage("Your turn ends. Please find other place.");
                        }
                        else {
                            LifeClue.View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                            that.addEventListener();
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        LifeClue.View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                        that.addEventListener();
                    }
                });
            });
            that.$('#submit-show-card').off('click');
            that.$('#submit-show-card').on('click', function () {
                that.$('#submit-show-card').off('click');
                var card = $("#show-card option:selected").attr('data-card');
                if (card == undefined) {
                    LifeClue.View.getInstance().setStatusMessage("Please choose a card to show <b>" + LifeClue.Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name") + "</b>.");
                }
                else {
                    $.ajax({
                        timeout: 10000,
                        url: LifeClue.Setting.getPhpDir() + "showcard.php",
                        type: "POST",
                        data: {
                            id: 1,
                            sc: card,
                        },
                        success: function (data, textStatus, jqXHR) {
                            if (data == 1) {
                                LifeClue.View.getInstance().setStatusMessage("You showed your card to <b>" + LifeClue.Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name") + "</b>.");
                            }
                            else {
                                LifeClue.View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                                that.addEventListener();
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            LifeClue.View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                            that.addEventListener();
                        }
                    });
                }
            });
            that.$('#submit-guess').off('click');
            that.$('#submit-guess').on('click', function () {
                that.$('#submit-guess').off('click');
                var location = $("#guess-location option:selected").attr('data-card');
                var character = $("#guess-suspect option:selected").attr('data-card');
                var weapon = $("#guess-weapon option:selected").attr('data-card');
                if (location == undefined || character == undefined || weapon == undefined) {
                    LifeClue.View.getInstance().setStatusMessage("Please make a selection.");
                }
                else {
                    that.$('#submit-guess').off('click');
                    $.ajax({
                        timeout: 10000,
                        url: LifeClue.Setting.getPhpDir() + "submitsuggestion.php",
                        type: "POST",
                        data: {
                            id: 1,
                            sg: location + "," + character + "," + weapon,
                        },
                        success: function (data, textStatus, jqXHR) {
                            if (data == 1) {
                                LifeClue.View.getInstance().setStatusMessage("You submit your suggestion. Please wait other's response.");
                            }
                            else {
                                LifeClue.View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                                that.addEventListener();
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            LifeClue.View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                            that.addEventListener();
                        }
                    });
                }
            });
            that.$('#claim-location').off('click');
            that.$('#claim-location').on('click', function () {
                that.$('#claim-location').off('click');
                var closestLocation = that.getClosestLocation();
                var isClamable = that.getIsLocationCloseEnough(closestLocation);
                if (isClamable) {
                    $.ajax({
                        timeout: 10000,
                        url: LifeClue.Setting.getPhpDir() + "claimlocation.php",
                        type: "POST",
                        data: {
                            id: 1,
                            character: LifeClue.Controller.getInstance().getCharacterId().charAt(1),
                            location: closestLocation.get('id').charAt(1),
                        },
                        success: function (data, textStatus, jqXHR) {
                            if (data == 1) {
                                LifeClue.View.getInstance().setStatusMessage("You successfully claim your location at " + closestLocation.get("name") + ".");
                                setTimeout(function () {
                                    LifeClue.View.getInstance().setStatusMessage("Please select your suggestion.");
                                }, 3000);
                                that.showSelectionMenu(closestLocation);
                            }
                            else if (data == 2) {
                                LifeClue.View.getInstance().setStatusMessage("Already visited this place in previous turn. Please claim other location.");
                                that.addEventListener();
                            }
                            else {
                                LifeClue.View.getInstance().setStatusMessage("Someone already claimed. Wait untill he/she finishes his turn.");
                                that.addEventListener();
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            LifeClue.View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                            that.addEventListener();
                        }
                    });
                }
                else {
                    LifeClue.View.getInstance().setStatusMessage("You're not close enough to " + closestLocation.get("name") + " for claiming location.");
                    that.addEventListener();
                }
            });
            that.$('#start-game').off('click');
            that.$('#start-game').on('click', function (e) {
                that.$('#start-game').off('click');
                var answer = LifeClue.Controller.getInstance().pickCrime();
                var cards = new Array();
                var locations = LifeClue.Controller.getInstance().getLocations();
                $.each(locations.models, function (index, model) {
                    if (model.get('bAnswer') == 0) {
                        cards.push(model);
                    }
                });
                var characters = LifeClue.Controller.getInstance().getCharacters();
                $.each(characters.models, function (index, model) {
                    if (model.get('bAnswer') == 0) {
                        cards.push(model);
                    }
                });
                var weapons = LifeClue.Controller.getInstance().getWeapons();
                $.each(weapons.models, function (index, model) {
                    if (model.get('bAnswer') == 0) {
                        cards.push(model);
                    }
                });
                cards = shuffle(cards);
                var numPlayers = LifeClue.Controller.getInstance().getGame().getNumPlayers();
                var numCardPerPlayer = Math.floor(cards.length / numPlayers);
                var numRestCards = cards.length - numCardPerPlayer * numPlayers;
                var ci = 0;
                $.each(characters.models, function (index, model) {
                    if (model.get('bActive') == 1) {
                        if (index < numRestCards) {
                            var str = "";
                            for (var i = 0; i <= numCardPerPlayer; i++) {
                                str += cards[ci].get("id") + ",";
                                ci++;
                            }
                            str = str.substr(0, str.length - 1);
                            model.set({ 'cardsInHand': str });
                        }
                        else {
                            var str = "";
                            for (var i = 0; i < numCardPerPlayer; i++) {
                                str += cards[ci].get("id") + ",";
                                ci++;
                            }
                            str = str.substr(0, str.length - 1);
                            model.set({ 'cardsInHand': str });
                        }
                    }
                });
                $.ajax({
                    timeout: 10000,
                    url: LifeClue.Setting.getPhpDir() + "startgame.php",
                    type: "POST",
                    data: {
                        id: 1,
                        sts: 1,
                        aw: answer,
                        d1: characters.models[0].get('cardsInHand'),
                        d2: characters.models[1].get('cardsInHand'),
                        d3: characters.models[2].get('cardsInHand'),
                        d4: characters.models[3].get('cardsInHand'),
                        d5: characters.models[4].get('cardsInHand'),
                        d6: characters.models[5].get('cardsInHand'),
                    },
                    success: function (data, textStatus, jqXHR) {
                        LifeClue.View.getInstance().setStatusMessage("Start the game!");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        LifeClue.View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                        that.addEventListener();
                    }
                });
            });
            that.$('#detect-location').off('click');
            that.$('#detect-location').on('click', function (e) {
                LifeClue.View.getInstance().getMapView().updateMapToCurLocation();
            });
            that.$('.character-name').off('click');
            that.$('.character-name').on('click', function (e) {
                var cur = $(this);
                $.ajax({
                    url: LifeClue.Setting.getPhpDir() + "selectcharacter.php",
                    type: "POST",
                    data: {
                        id: 1,
                        prevcharacter: LifeClue.Controller.getInstance().getCharacterId(),
                        newcharacter: cur.attr('id'),
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data == 1) {
                            LifeClue.Router.getInstance().navigate("setup/" + cur.attr('id'), { trigger: false, replace: true });
                            LifeClue.Controller.getInstance().setCharacterId(cur.attr('id'));
                        }
                        else {
                            if (LifeClue.Controller.getInstance().getCharacterId() != cur.attr('id')) {
                                that.setMessage("'" + that.$('#' + cur.attr('id')).html() + "' is already taken.");
                            }
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        LifeClue.View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                        that.addEventListener();
                    }
                });
            });
        };
        WingView.prototype.showSelectionMenu = function (location) {
            var that = this;
            LifeClue.Controller.getInstance().bShowClaimLocation = true;
            that.$('#claim-location').addClass('disabled');
            var template = _.template(LifeClue.Setting.getInstance().getWingMakeGuessTemplate());
            var data = {
                "locationId": location.get("id"),
                "locationName": location.get("name"),
                "characters": LifeClue.Controller.getInstance().getCharacters(),
                "weapons": LifeClue.Controller.getInstance().getWeapons(),
            };
            that.$('#panel-guess').html(template(data));
            that.addEventListener();
        };
        WingView.prototype.showSelectionResult = function () {
            var that = this;
            LifeClue.Controller.getInstance().bShowClaimLocation = false;
            var suggestion = LifeClue.Controller.getInstance().getGame().get("sg").split(",");
            if (suggestion != undefined) {
                that.$('#claim-location').addClass('disabled');
                that.$('#accusation').addClass('disabled');
                that.$('#panel-guess').html("");
                var template = _.template(LifeClue.Setting.getInstance().getWingShowSuggestionTemplate());
                var location;
                var character;
                var weapon;
                var locations = LifeClue.Controller.getInstance().getLocations();
                $.each(locations.models, function (index, model) {
                    if (model.get('id') == suggestion[0]) {
                        location = model;
                    }
                });
                var characters = LifeClue.Controller.getInstance().getCharacters();
                $.each(characters.models, function (index, model) {
                    if (model.get('id') == suggestion[1]) {
                        character = model;
                    }
                });
                var weapons = LifeClue.Controller.getInstance().getWeapons();
                $.each(weapons.models, function (index, model) {
                    if (model.get('id') == suggestion[2]) {
                        weapon = model;
                    }
                });
                var data = {
                    "message": '<b>' + LifeClue.Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name") + "</b> suggested that <b>" + character.get("name") + "</b> commited a crime with a/an <b>" + weapon.get("name") + "</b> at <b>" + location.get("name") + '</b>',
                };
                that.$('#panel-show-suggestion').html(template(data));
                that.addEventListener();
                LifeClue.Controller.getInstance().bShowSuggestionResult = true;
            }
        };
        WingView.prototype.showSelectionShowCard = function () {
            var that = this;
            LifeClue.Controller.getInstance().bShowClaimLocation = true;
            var suggestion = LifeClue.Controller.getInstance().getGame().get("sg").split(",");
            var showCardPlayer = LifeClue.Controller.getInstance().getGame().getNextCardHolder(suggestion);
            if (showCardPlayer == null) {
                console.log("There is no player to show the card.");
                $.ajax({
                    timeout: 10000,
                    url: LifeClue.Setting.getPhpDir() + "winner.php",
                    type: "POST",
                    data: {
                        id: 1,
                        character: LifeClue.Controller.getInstance().getCharacterId().charAt(1),
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data == 1) {
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        LifeClue.View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                        that.addEventListener();
                    }
                });
            }
            else if (showCardPlayer != null && showCardPlayer.get('id') == LifeClue.Controller.getInstance().getCharacterId()) {
                var cards = LifeClue.Controller.getInstance().getGame().getMatchCards(suggestion, showCardPlayer.get('cardsInHand').split(","));
                var template = _.template(LifeClue.Setting.getInstance().getWingShowCardTemplate());
                var temp = Array();
                var locations = LifeClue.Controller.getInstance().getLocations();
                $.each(locations.models, function (index, model) {
                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i] == model.get('id')) {
                            temp.push(model);
                        }
                    }
                });
                var characters = LifeClue.Controller.getInstance().getCharacters();
                $.each(characters.models, function (index, model) {
                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i] == model.get('id')) {
                            temp.push(model);
                        }
                    }
                });
                var weapons = LifeClue.Controller.getInstance().getWeapons();
                $.each(weapons.models, function (index, model) {
                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i] == model.get('id')) {
                            temp.push(model);
                        }
                    }
                });
                var data = {
                    "cards": temp,
                };
                that.$('#panel-show-card').html(template(data));
                that.addEventListener();
                LifeClue.Controller.getInstance().bShowCardShow = true;
            }
        };
        WingView.prototype.showSelectionShowCardResult = function () {
            var that = this;
            LifeClue.Controller.getInstance().bShowClaimLocation = false;
            that.$('#claim-location').addClass('disabled');
            that.$('#accusation').addClass('disabled');
            that.$('#panel-guess').html("");
            var suggestion = LifeClue.Controller.getInstance().getGame().get("sg").split(",");
            var showCardPlayer = LifeClue.Controller.getInstance().getGame().getNextCardHolder(suggestion);
            if (LifeClue.Controller.getInstance().getGame().get('cc') == parseInt(LifeClue.Controller.getInstance().getCharacterId()[1])) {
                var template = _.template(LifeClue.Setting.getInstance().getWingShowCardResultTemplate1());
                var showedCardId = LifeClue.Controller.getInstance().getGame().get('sc');
                var showCard;
                var locations = LifeClue.Controller.getInstance().getLocations();
                $.each(locations.models, function (index, model) {
                    if (showedCardId == model.get('id')) {
                        showCard = model;
                    }
                });
                var characters = LifeClue.Controller.getInstance().getCharacters();
                $.each(characters.models, function (index, model) {
                    if (showedCardId == model.get('id')) {
                        showCard = model;
                    }
                });
                var weapons = LifeClue.Controller.getInstance().getWeapons();
                $.each(weapons.models, function (index, model) {
                    if (showedCardId == model.get('id')) {
                        showCard = model;
                    }
                });
                var data = {
                    "message": '<b>' + showCardPlayer.get("name") + "</b> showed you a/an <b>" + showCard.get("name") + "</b> card.",
                };
                $('input[type="checkbox"][data-card="' + showCard.get('id') + '"]').prop({ 'checked': 'checked' });
                $('input[type="text"][data-card="' + showCard.get('id') + '"]').val('From ' + showCardPlayer.get("name") + ".");
            }
            else {
                var template = _.template(LifeClue.Setting.getInstance().getWingShowCardResultTemplate2());
                var data = {
                    "message": '<b>' + showCardPlayer.get("name") + "</b> showed a card to <b>" + LifeClue.Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name") + "</b>.",
                };
            }
            that.$('#panel-show-suggestion').html(template(data));
            that.addEventListener();
            LifeClue.Controller.getInstance().bShowCardShowResult = true;
        };
        WingView.prototype.showClaimLocation = function () {
            var that = this;
            LifeClue.Controller.getInstance().bShowCardShow = false;
            LifeClue.Controller.getInstance().bShowCardShowResult = false;
            LifeClue.Controller.getInstance().bShowSuggestionResult = false;
            that.$('#claim-location').removeClass('disabled');
            that.$('#accusation').removeClass('disabled');
            that.$('#panel-guess').html("");
            that.$('#panel-show-suggestion').html("");
            LifeClue.Controller.getInstance().bShowClaimLocation = true;
        };
        WingView.prototype.showWinner = function () {
            var that = this;
            var template = _.template(LifeClue.Setting.getInstance().getWingShowWinnerTemplate());
            var winner = LifeClue.Controller.getInstance().getCharacters().findWhere({ id: 'c' + LifeClue.Controller.getInstance().getGame().get('wn') + 's' });
            var answer = LifeClue.Controller.getInstance().getGame().get('aw').split(",");
            var location;
            var character;
            var weapon;
            var locations = LifeClue.Controller.getInstance().getLocations();
            $.each(locations.models, function (index, model) {
                for (var i = 0; i < answer.length; i++) {
                    if (answer[i] == model.get('id')) {
                        location = model;
                    }
                }
            });
            var characters = LifeClue.Controller.getInstance().getCharacters();
            $.each(characters.models, function (index, model) {
                for (var i = 0; i < answer.length; i++) {
                    if (answer[i] == model.get('id')) {
                        character = model;
                    }
                }
            });
            var weapons = LifeClue.Controller.getInstance().getWeapons();
            $.each(weapons.models, function (index, model) {
                for (var i = 0; i < answer.length; i++) {
                    if (answer[i] == model.get('id')) {
                        weapon = model;
                    }
                }
            });
            var data = {
                "message": '<b>' + winner.get("name") + "</b> discovered the truth of the crime.<br/><b>" + character.get("name") + "</b> commited the crime at <b>" + location.get("name") + "</b> with <b>" + weapon.get("name") + "</b>",
            };
            that.$('#claim-location').addClass('disabled');
            that.$('#panel-show-suggestion').html(template(data));
            LifeClue.View.getInstance().setStatusMessage('<b>' + winner.get("name") + "</b> wins the game.");
        };
        return WingView;
    })(Backbone.View);
    LifeClue.WingView = WingView;
})(LifeClue || (LifeClue = {}));
