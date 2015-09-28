var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LifeClue;
(function (LifeClue) {
    var Controller = (function () {
        function Controller(args) {
            var _this = this;
            this.updateFromServer = function () {
                var that = _this;
                var location = LifeClue.View.getInstance().getMapView().getLocation();
                if (location) {
                    $.ajax({
                        timeout: 10000,
                        url: LifeClue.Setting.getPhpDir() + "updatelocation.php",
                        type: "POST",
                        data: {
                            id: 1,
                            character: Controller.getInstance().getCharacterId().charAt(1),
                            lat: location.lat,
                            lng: location.lng,
                        },
                        success: function (data, textStatus, jqXHR) {
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("error");
                            that.updateFromServer();
                        }
                    });
                }
                if (that.gameTable != undefined) {
                    that.gameTable.fetch({
                        processData: true,
                        dataType: 'json',
                        timeout: 10000,
                        data: {
                            id: 1,
                        },
                        success: function (collection, response, options) {
                            $('#database-status').removeClass('hidden');
                            setTimeout(function () {
                                $('#database-status').addClass('hidden');
                            }, 500);
                            if (collection.models[0].get('sts') == 0) {
                                if (Controller.getInstance().gameStatus != 1 /* READY */) {
                                    Router.getInstance().navigate("setup/" + that.characterId, { trigger: true, replace: true });
                                }
                            }
                            else if (collection.models[0].get('sts') == 1) {
                                if (Controller.getInstance().gameStatus != 2 /* PLAY */) {
                                    Router.getInstance().navigate("game/" + that.characterId, { trigger: true, replace: true });
                                }
                            }
                            else if (collection.models[0].get('sts') == 2) {
                                if (Controller.getInstance().gameStatus != 3 /* END */) {
                                    Router.getInstance().navigate("result/" + that.characterId, { trigger: true, replace: true });
                                }
                            }
                            LifeClue.View.getInstance().getWingView().update();
                            that.updateCharacters();
                            setTimeout(function () {
                                Controller.getInstance().updateFromServer();
                            }, 3000);
                            if (!that.isAutoFilled) {
                                setTimeout(function () {
                                    $.each(that.characters.models, function (index, model) {
                                        model.set({
                                            'cardsInHand': that.getGame().get('d' + (index + 1))
                                        });
                                    });
                                    var player = Controller.getInstance().getYourCharacter();
                                    if (player != undefined) {
                                        var cards = player.get('cardsInHand').split(",");
                                        $.each(cards, function (index, model) {
                                            $('input[type="checkbox"][data-card="' + model + '"]').prop({ "checked": true, "disabled": true });
                                            $('input[type="text"][data-card="' + model + '"]').prop({ "disabled": true }).val("In your hand.");
                                        });
                                        that.isAutoFilled = true;
                                    }
                                }, 1500);
                            }
                            if (that.getGame().get('wn') != 0) {
                                LifeClue.View.getInstance().getWingView().showWinner();
                            }
                            else if (that.getGame().get('cc') == 0 && that.getGame().get('sg') == "" && that.getGame().get('sc') == "") {
                                if (!that.bShowClaimLocation) {
                                    setTimeout(function () {
                                        LifeClue.View.getInstance().getWingView().showClaimLocation();
                                    }, 1000);
                                }
                            }
                            else if (that.getGame().get('cc') != 0 && that.getGame().get('sg') != "" && that.getGame().get('sc') == "") {
                                if (!that.bShowSuggestionResult) {
                                    setTimeout(function () {
                                        LifeClue.View.getInstance().getWingView().showSelectionResult();
                                    }, 1000);
                                }
                                if (!that.bShowCardShow) {
                                    setTimeout(function () {
                                        LifeClue.View.getInstance().getWingView().showSelectionShowCard();
                                    }, 2000);
                                }
                            }
                            else if (that.getGame().get('cc') != 0 && that.getGame().get('sg') != "" && that.getGame().get('sc') != "") {
                                if (!that.bShowCardShowResult) {
                                    setTimeout(function () {
                                        LifeClue.View.getInstance().getWingView().showSelectionShowCardResult();
                                    }, 1000);
                                }
                            }
                            if (Controller.getInstance().gameStatus == 1 /* READY */) {
                                $.ajax({
                                    timeout: 10000,
                                    url: LifeClue.Setting.getPhpDir() + "resetbrowsercache.php",
                                    type: "POST",
                                    data: {},
                                    success: function (data, textStatus, jqXHR) {
                                        console.log("browser cache is resetted.");
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        console.log("error.");
                                    }
                                });
                            }
                            else {
                                if (that.bFirstLoadingBrowserCache) {
                                    that.bFirstLoadingBrowserCache = false;
                                    $.ajax({
                                        timeout: 10000,
                                        url: LifeClue.Setting.getPhpDir() + "loadbrowsercache.php",
                                        type: "POST",
                                        data: {},
                                        success: function (data, textStatus, jqXHR) {
                                            if (data != "") {
                                                var numCheckbox = 0;
                                                $.each($('input[type="checkbox"]'), function (index, model) {
                                                    numCheckbox++;
                                                });
                                                var temp1 = data.substr(0, numCheckbox);
                                                var temp2 = data.substr(numCheckbox, data.length);
                                                var temp3 = temp2.split("|", numCheckbox);
                                                $.each($('input[type="checkbox"]'), function (index, model) {
                                                    if (temp1.charAt(index) == '1') {
                                                        $(model).prop({ 'checked': 'checked' });
                                                    }
                                                });
                                                $.each($('input[type="text"]'), function (index, model) {
                                                    if (temp3[index] != undefined) {
                                                        $(model).val(temp3[index].trim());
                                                    }
                                                });
                                            }
                                        },
                                        error: function (jqXHR, textStatus, errorThrown) {
                                            console.log("error.");
                                        }
                                    });
                                }
                                else {
                                    var checkbox = "";
                                    var memo = "";
                                    var checkboxValid = false;
                                    var numCheckbox = 0;
                                    $.each($('input[type="checkbox"]'), function (index, model) {
                                        if ($(model).prop('checked') == true) {
                                            checkbox += '1';
                                            checkboxValid = true;
                                        }
                                        else {
                                            checkbox += '0';
                                        }
                                        numCheckbox++;
                                    });
                                    $.each($('input[type="text"]'), function (index, model) {
                                        checkbox += $(model).val() + " |";
                                    });
                                    checkbox = checkbox.substr(0, checkbox.length);
                                    if (checkboxValid) {
                                        $.ajax({
                                            timeout: 10000,
                                            url: LifeClue.Setting.getPhpDir() + "updatebrowsercache.php",
                                            type: "POST",
                                            data: {
                                                checkbox: checkbox,
                                                memo: memo,
                                            },
                                            success: function (data, textStatus, jqXHR) {
                                                var temp1 = data.substr(0, numCheckbox);
                                                var temp2 = data.substr(numCheckbox, data.length);
                                                var temp3 = temp2.split("|", numCheckbox);
                                                $.each($('input[type="checkbox"]'), function (index, model) {
                                                    if (temp1.charAt(index) == '1') {
                                                        $(model).prop({ 'checked': 'checked' });
                                                    }
                                                });
                                                $.each($('input[type="text"]'), function (index, model) {
                                                    if (temp3[index] != undefined) {
                                                        $(model).val(temp3[index].trim());
                                                    }
                                                });
                                            },
                                            error: function (jqXHR, textStatus, errorThrown) {
                                                console.log("error.");
                                            }
                                        });
                                    }
                                }
                            }
                            that.messageUpdate();
                        },
                        error: function (collection, response, options) {
                            console.log(response);
                            console.log(options);
                            console.log("error while fetching data from the server.");
                        }
                    });
                }
            };
            if (Controller._instance) {
                throw new Error("Error: Instantiation failed: Use Controller.getInstance() instead of new.");
            }
            Controller._instance = this;
            this.watchId = -1;
            this.isAutoFilled = false;
            this.bShowSuggestionResult = false;
            this.bShowCardShow = false;
            this.bShowCardShowResult = false;
            this.bShowClaimLocation = false;
            this.bFirstLoadingBrowserCache = true;
            this.gameStatus = 0 /* NONE */;
        }
        Controller.getInstance = function () {
            return Controller._instance;
        };
        Controller.prototype.getWatchId = function () {
            return this.watchId;
        };
        Controller.prototype.loadHomePage = function () {
            var that = this;
            navigator.geolocation.clearWatch(that.watchId);
            LifeClue.View.getInstance().loadBasePageLayout();
            LifeClue.View.getInstance().loadHomePageLayout();
            if (this.gameTable == undefined) {
                this.gameTable = LifeClue.GameFactory.getInstance().create();
            }
            if (this.characters == undefined) {
                this.characters = LifeClue.CharacterFactory.getInstance().create();
            }
            if (this.locations == undefined) {
                this.locations = LifeClue.LocationFactory.getInstance().create();
            }
            if (this.weapons == undefined) {
                this.weapons = LifeClue.WeaponFactory.getInstance().create();
            }
            that.intializeGeoWatch();
        };
        Controller.prototype.loadGamePage = function () {
            var that = this;
            navigator.geolocation.clearWatch(that.watchId);
            LifeClue.View.getInstance().loadBasePageLayout();
            LifeClue.View.getInstance().loadGamePageLayout();
            if (this.gameTable == undefined) {
                this.gameTable = LifeClue.GameFactory.getInstance().create();
            }
            if (this.characters == undefined) {
                this.characters = LifeClue.CharacterFactory.getInstance().create();
            }
            if (this.locations == undefined) {
                this.locations = LifeClue.LocationFactory.getInstance().create();
            }
            if (this.weapons == undefined) {
                this.weapons = LifeClue.WeaponFactory.getInstance().create();
            }
            that.intializeGeoWatch();
        };
        Controller.prototype.intializeGeoWatch = function () {
            var that = this;
            if (navigator.geolocation) {
                that.watchId = navigator.geolocation.watchPosition(function (position) {
                    if (that.characterId != 'c0s') {
                        $('#gps-status').removeClass('hidden');
                        setTimeout(function () {
                            $('#gps-status').addClass('hidden');
                        }, 500);
                        LifeClue.View.getInstance().getMapView().setLocation(new L.LatLng(position.coords.latitude, position.coords.longitude));
                    }
                }, function () {
                    that.intializeGeoWatch();
                }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 60000
                });
            }
        };
        Controller.prototype.setCharacterId = function (id) {
            this.characterId = id;
        };
        Controller.prototype.getCharacterId = function () {
            return this.characterId;
        };
        Controller.prototype.messageUpdate = function () {
            var that = this;
            if (Controller.getInstance().gameStatus == 2 /* PLAY */) {
                if (that.getGame().get('cc') != 0 && that.getGame().get('sg') != "" && that.getGame().get('sc') == "") {
                    if (that.getGame().get('cc') == parseInt(that.getCharacterId()[1])) {
                        LifeClue.View.getInstance().setStatusMessage("You submit your suggestion. Please wait other's response.");
                    }
                    else {
                        LifeClue.View.getInstance().setStatusMessage('<b>' + that.getGame().getCharacterMakingSuggestion().get("name") + "</b> submitted his suggestion.");
                    }
                }
                else if (that.getGame().get('cc') != 0 && that.getGame().get('sg') != "" && that.getGame().get('sc') != "") {
                    var suggestion = Controller.getInstance().getGame().get("sg").split(",");
                    var showCardPlayer = Controller.getInstance().getGame().getNextCardHolder(suggestion);
                    if (showCardPlayer != undefined) {
                        LifeClue.View.getInstance().setStatusMessage('<b>' + showCardPlayer.get("name") + "</b> showed a card to <b>" + that.getGame().getCharacterMakingSuggestion().get("name") + "</b>.");
                    }
                }
                else if (that.getGame().get('cc') != 0 && that.getGame().get('cc') != parseInt(that.getCharacterId()[1])) {
                    if (that.getGame().getCharacterMakingSuggestion() != null) {
                        LifeClue.View.getInstance().setStatusMessage('<b>' + that.getGame().getCharacterMakingSuggestion().get("name") + "</b> is making a suggestion.");
                    }
                }
            }
        };
        Controller.prototype.getGame = function () {
            if (this.gameTable == undefined) {
                return null;
            }
            return this.gameTable.models[0];
        };
        Controller.prototype.getCharacters = function () {
            return this.characters;
        };
        Controller.prototype.updateCharacters = function () {
            var that = this;
            var game = that.getGame();
            for (var i = 1; i <= 6; i++) {
                that.characters.findWhere({ id: 'c' + i + 's' }).set({
                    bActive: game.get('c' + i + 's'),
                    latitude: game.get('c' + i + 't'),
                    longitude: game.get('c' + i + 'g'),
                });
            }
            LifeClue.View.getInstance().getMarkerView().update();
        };
        Controller.prototype.getLocations = function () {
            return this.locations;
        };
        Controller.prototype.getWeapons = function () {
            return this.weapons;
        };
        Controller.prototype.pickCrime = function () {
            var that = this;
            that.characters.at(Math.floor(Math.random() * that.characters.models.length)).set({ bAnswer: 1 });
            that.locations.at(Math.floor(Math.random() * that.characters.models.length)).set({ bAnswer: 1 });
            that.weapons.at(Math.floor(Math.random() * that.characters.models.length)).set({ bAnswer: 1 });
            console.log("Criminal: " + that.characters.findWhere({ bAnswer: 1 }).get("name"));
            console.log("Location: " + that.locations.findWhere({ bAnswer: 1 }).get("name"));
            console.log("Weapon: " + that.weapons.findWhere({ bAnswer: 1 }).get("name"));
            return that.locations.findWhere({ bAnswer: 1 }).get("id") + "," + that.characters.findWhere({ bAnswer: 1 }).get("id") + "," + that.weapons.findWhere({ bAnswer: 1 }).get("id");
        };
        Controller.prototype.getYourCharacter = function () {
            return this.characters.findWhere({ id: this.characterId });
        };
        Controller._instance = new Controller();
        return Controller;
    })();
    LifeClue.Controller = Controller;
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router(options) {
            if (Router._instance) {
                throw new Error("Error: Instantiation failed: Use Router.getInstance() instead of new.");
            }
            Router._instance = this;
            this.routes = {
                "": "home",
                "setup/:id": "setup",
                "game/:id": "game",
                "result/:id": "result",
                "reset": "reset",
                "status": "status",
            };
            _super.call(this, options);
        }
        Router.getInstance = function () {
            return Router._instance;
        };
        Router.prototype.home = function () {
            this.navigate("setup/c0s", { trigger: true, replace: true });
        };
        Router.prototype.setup = function (id) {
            console.log("we have loaded the setup page with id: " + id);
            Controller.getInstance().setCharacterId(id.toString());
            LifeClue.Controller.getInstance().loadHomePage();
            Controller.getInstance().gameStatus = 1 /* READY */;
        };
        Router.prototype.game = function (id) {
            console.log("we have loaded the game page with id: " + id);
            Controller.getInstance().isAutoFilled = false;
            Controller.getInstance().setCharacterId(id.toString());
            LifeClue.Controller.getInstance().loadGamePage();
            Controller.getInstance().gameStatus = 2 /* PLAY */;
        };
        Router.prototype.result = function (id) {
            console.log("we have loaded the result page with id: " + id);
            Controller.getInstance().setCharacterId(id.toString());
        };
        Router.prototype.reset = function () {
            isResetting = true;
            $.ajax({
                timeout: 10000,
                url: LifeClue.Setting.getPhpDir() + "resetgame.php",
                type: "POST",
                data: {
                    id: 1,
                },
                success: function (data, textStatus, jqXHR) {
                    if (data == 1) {
                        alert("game is reseted");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("failed to reset the game.");
                }
            });
        };
        Router.prototype.status = function () {
            isResetting = true;
            console.log("!");
            var str = "";
            str += "<div>1) Kitchen, 2) Lounge, 3) Library, 4) Dining Room, 5) Hall, 6) Cellar, 7) Conservatory, 8) Ballroom</div><hr>";
            str += "<div>1) Miss Scarlett, 2) Professor Plum, 3) Mrs.Peacock, 4) Reverend Green, 5) Colonel Mustard, 6) Mrs.Black</div><hr>";
            str += "<div>1) Candlestick, 2) Poison, 3) Rope, 4) Gloves, 5) Horseshoe, 6) Knife, 7) Lead Pipe</div><hr>";
            $.ajax({
                timeout: 10000,
                url: LifeClue.Setting.getPhpDir() + "gamestatistic.php",
                type: "GET",
                data: {
                    id: 1,
                },
                success: function (data, textStatus, jqXHR) {
                    str += data;
                    console.log(str);
                    $('#view-main').html(str);
                    $('hr').css({ 'margin-top': '2px' });
                    $('#view-main').css({ 'text-align': 'left', 'font-size': 'small', 'overflow-y': 'scroll' });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
            setTimeout(function () {
                $.ajax({
                    timeout: 10000,
                    url: LifeClue.Setting.getPhpDir() + "gamestatistic.php",
                    type: "GET",
                    data: {
                        id: 1,
                    },
                    success: function (data, textStatus, jqXHR) {
                        str += data;
                        console.log(str);
                        $('#view-main').html(str);
                        $('#view-main').css({ 'text-align': 'left', 'font-size': 'small', 'overflow-y': 'scroll' });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });
            }, 30000);
        };
        Router._instance = new Router();
        return Router;
    })(Backbone.Router);
    LifeClue.Router = Router;
})(LifeClue || (LifeClue = {}));
