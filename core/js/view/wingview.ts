module LifeClue {
    export enum WingViewType {
        NONE, SELECTCHARACTER, NOTE, SHOWCARD
    }
    export class WingView extends Backbone.View<Backbone.Model> {
        private viewType: WingViewType;
        private bActive: boolean;
        private timeOut: number;
        constructor(viewType: WingViewType, options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var that: WingView = this;
            that.setElement(options.el);
            that.viewType = viewType;
        }
        render(): any {
            var that: WingView = this;

            if (that.viewType == WingViewType.SELECTCHARACTER) {
                that.$el.css({
                    height: $('#panel-body').height(),
                });
                var template = _.template(LifeClue.Setting.getInstance().getWingCharacterSelectTemplate());
                var data = {
                    "detect": Setting.getInstance().getDetectGeoLocationText(),
                    "select": Setting.getInstance().getSelectYourCharacterText(),
                    "message": Setting.getInstance().nonAvailableText(),
                    "character1": Setting.getInstance().getCharacter1Name(),
                    "character2": Setting.getInstance().getCharacter2Name(),
                    "character3": Setting.getInstance().getCharacter3Name(),
                    "character4": Setting.getInstance().getCharacter4Name(),
                    "character5": Setting.getInstance().getCharacter5Name(),
                    "character6": Setting.getInstance().getCharacter6Name(),
                    "start": Setting.getInstance().getStartGameText(),
                }
                that.$el.html(template(data));
                View.getInstance().setStatusMessage('Welcome to <b>LifeClue</b>. Please select your character.');
                

                

                that.addEventListener();
            } else if (that.viewType == WingViewType.NOTE) {
                setTimeout(function () {
                    var template = _.template(LifeClue.Setting.getInstance().getWingPlayNoteTemplate());
                    var data2 = {
                        "location": Setting.getInstance().getClaimLocationText(),
                        "locations": Controller.getInstance().getLocations(),
                        "characters": Controller.getInstance().getCharacters(),
                        "weapons": Controller.getInstance().getWeapons(),
                    }
                    that.$el.html(template(data2));
                    that.addEventListener();

                }, 500);
                
                
                
            }
            that.show();
            that.$el.css({
                height: $('#panel-body').height(),
            });
            
        }

        update(): any {
            var that: WingView = this;
            var game: Game = Controller.getInstance().getGame();

            if (that.viewType == WingViewType.SELECTCHARACTER) {
                if (game != undefined) {
                    for (var i = 1; i <= 6; i++) {
                        if (game.get('c' + i + 's') == 0) {
                            that.$('#c' + i + 's').removeClass('disabled');
                            that.$('#c' + i + 's').removeClass('selected');
                        } else if (Controller.getInstance().getCharacterId() == 'c' + i + 's') {
                            that.$('#c' + i + 's').removeClass('disabled');
                            that.$('#c' + i + 's').addClass('selected');
                            that.setMessage("You selected '" + that.$('#c' + i + 's').html() + "'");
                            View.getInstance().setStatusMessage("You selected '" + that.$('#c' + i + 's').html() + "'");
                        } else {
                            that.$('#c' + i + 's').addClass('disabled');
                            that.$('#c' + i + 's').removeClass('selected');
                        }
                    }

                    if (Controller.getInstance().getCharacterId() == 'c6s') {
                        that.$('#start-game').removeClass('hidden');
                    } else {
                        that.$('#start-game').addClass('hidden');
                    }
                }
            } else if (that.viewType == WingViewType.NOTE) {

            }
            
        }

        setMessage(msg: string): void {
            var that: WingView = this;
            that.$('#message').html(msg);
        }

        show(): void {
            var that: WingView = this;
            clearTimeout(that.timeOut);
            that.$el.removeClass('hidden');
            that.timeOut = setTimeout(function () {
                that.$el.addClass('show');
            }, Setting.getInstance().getWingViewShowDelay());
            that.bActive = true;
        }
        hide(): void {
            var that: WingView = this;
            that.bActive = false;
            clearTimeout(that.timeOut);
            that.$el.removeClass('show');
            that.timeOut = setTimeout(function () {
                that.$el.addClass('hidden');
            }, Setting.getInstance().getWingViewShowDelay());
        }

        getIsActive(): boolean {
            return this.bActive;
        }

        getClosestLocation(): Location {
            var locations: Locations = Controller.getInstance().getLocations();
            var curLoctation: L.LatLng = View.getInstance().getMapView().getLocation();
            var closestLocation: Location = locations.models[0];
            var closestDistance: number = distance(curLoctation, new L.LatLng(closestLocation.get("latitude"), closestLocation.get("longitude")));
            if (locations != undefined) {
                $.each(locations.models, function (index: number, model: Location) {
                    var tempDistance: number = distance(curLoctation, new L.LatLng(model.get("latitude"), model.get("longitude")));
                    if (tempDistance < closestDistance) {
                        closestLocation = model;
                        closestDistance = tempDistance;
                    }
                });
            }
            return closestLocation;
        }
        getIsLocationCloseEnough(location: Location): boolean {
            var curLoctation: L.LatLng = View.getInstance().getMapView().getLocation();
            var closestDistance: number = distance(curLoctation, new L.LatLng(location.get("latitude"), location.get("longitude")));
            if (closestDistance < location.get("radius")) {
                return true;
            }
            return false;
        }

        addEventListener(): void {
            var that: WingView = this;


            //finish-turn
            that.$('#finish-turn').off('click');
            that.$('#finish-turn').on('click', function () {
                that.$('#finish-turn').off('click');
                $.ajax({
                    timeout: 10000,
                    url: Setting.getPhpDir() + "finishturn.php",
                    type: "POST",
                    data: {
                        id: 1,
                    },
                    success: function (data, textStatus, jqXHR) {
                        //console.log(data);
                        if (data == 1) {
                            View.getInstance().setStatusMessage("Your turn ends. Please find other place.");
                            //that.showSelectionMenu(closestLocation);
                        } else {
                            View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                            that.addEventListener();
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                        that.addEventListener();
                    }
                });
            });

            that.$('#submit-show-card').off('click');
            that.$('#submit-show-card').on('click', function () {
                that.$('#submit-show-card').off('click');
                var card: string = $("#show-card option:selected").attr('data-card');
                //console.log(card);
                if (card == undefined) {
                    View.getInstance().setStatusMessage("Please choose a card to show <b>" + Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name") + "</b>.");
                } else {
                    $.ajax({
                        timeout: 10000,
                        url: Setting.getPhpDir() + "showcard.php",
                        type: "POST",
                        data: {
                            id: 1,
                            sc: card,
                        },
                        success: function (data, textStatus, jqXHR) {
                            //console.log(data);
                            if (data == 1) {
                                View.getInstance().setStatusMessage("You showed your card to <b>" + Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name") + "</b>.");
                                //that.showSelectionMenu(closestLocation);
                            } else {
                                View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                                that.addEventListener();
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                            that.addEventListener();
                        }
                    });
                }

            });
            

            that.$('#submit-guess').off('click');
            that.$('#submit-guess').on('click', function () {
                that.$('#submit-guess').off('click');
                var location: string = $("#guess-location option:selected").attr('data-card');
                var character: string = $("#guess-suspect option:selected").attr('data-card');
                var weapon: string = $("#guess-weapon option:selected").attr('data-card');

                if (location == undefined || character == undefined || weapon == undefined) {
                    View.getInstance().setStatusMessage("Please make a selection.");
                } else {
                    that.$('#submit-guess').off('click');
                    //console.log(" You suggested " + location + ", " + character + ", " + weapon);

                    $.ajax({
                        timeout: 10000,
                        url: Setting.getPhpDir() + "submitsuggestion.php",
                        type: "POST",
                        data: {
                            id: 1,
                            sg: location + "," + character + "," + weapon,
                        },
                        success: function (data, textStatus, jqXHR) {
                            //console.log(data);
                            if (data == 1) {
                                View.getInstance().setStatusMessage("You submit your suggestion. Please wait other's response.");
                                //that.showSelectionMenu(closestLocation);
                            } else {
                                View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                                that.addEventListener();
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                            that.addEventListener();
                        }
                    });
                }

            });
            /*
            that.$('#accusation').off('click');
            that.$('#accusation').on('click', function () {
                var answer = confirm("Do you want to make accusation? If you failed, you cannot claim anymore.")
                if (answer) {
                    //console.log("accusation start");
                } else {
                    
                }
            });
            */

            that.$('#claim-location').off('click');
            that.$('#claim-location').on('click', function () {
                that.$('#claim-location').off('click');
                //console.log("claim-location");
                var closestLocation = that.getClosestLocation();
                var isClamable = that.getIsLocationCloseEnough(closestLocation);

                if (isClamable) {
                    $.ajax({
                        timeout: 10000,
                        url: Setting.getPhpDir() + "claimlocation.php",
                        type: "POST",
                        data: {
                            id: 1,
                            character: Controller.getInstance().getCharacterId().charAt(1),
                            location: closestLocation.get('id').charAt(1),
                        },
                        success: function (data, textStatus, jqXHR) {
                            //console.log(data);
                            if (data == 1) {
                                View.getInstance().setStatusMessage("You successfully claim your location at " + closestLocation.get("name") + ".");
                                setTimeout(function () {
                                    View.getInstance().setStatusMessage("Please select your suggestion.");
                                }, 3000);

                                that.showSelectionMenu(closestLocation);
                            } else if (data == 2) {
                                View.getInstance().setStatusMessage("Already visited this place in previous turn. Please claim other location.");
                                that.addEventListener();
                            } else {
                                View.getInstance().setStatusMessage("Someone already claimed. Wait untill he/she finishes his turn.");
                                that.addEventListener();
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                            that.addEventListener();
                        }
                    });
                } else {
                    View.getInstance().setStatusMessage("You're not close enough to " + closestLocation.get("name") + " for claiming location.");
                    that.addEventListener();
                }
                
            });

            that.$('#start-game').off('click');
            that.$('#start-game').on('click', function (e) {
                that.$('#start-game').off('click');
                var answer = Controller.getInstance().pickCrime();

                // randomize cards and hand them into players.
                var cards: Array<Backbone.Model> = new Array<Backbone.Model>();
                var locations: Locations = Controller.getInstance().getLocations();
                $.each(locations.models, function (index: number, model: Location) {
                    if (model.get('bAnswer') == 0) {
                        cards.push(model);
                    }
                });
                var characters: Characters = Controller.getInstance().getCharacters();
                $.each(characters.models, function (index: number, model: Character) {
                    if (model.get('bAnswer') == 0) {
                        cards.push(model);
                    }
                });
                var weapons: Weapons = Controller.getInstance().getWeapons();
                $.each(weapons.models, function (index: number, model: Weapon) {
                    if (model.get('bAnswer') == 0) {
                        cards.push(model);
                    }
                });

                //console.log(cards[0].get("name") + "|" + cards[1].get("name") + "|" + cards[2].get("name") + "|" + cards[3].get("name"));
                cards = shuffle(cards);

                var numPlayers: number = Controller.getInstance().getGame().getNumPlayers();
                var numCardPerPlayer: number = Math.floor(cards.length / numPlayers);
                //console.log(numCardPerPlayer);
                var numRestCards: number = cards.length - numCardPerPlayer * numPlayers;
                //console.log(numRestCards);

                var ci: number = 0;
                $.each(characters.models, function (index: number, model: Character) {
                    if (model.get('bActive') == 1) {
                        if (index < numRestCards) {
                            var str: string = "";
                            for (var i = 0; i <= numCardPerPlayer; i++) {
                                str += cards[ci].get("id") + ",";
                                ci++;
                            }
                            str = str.substr(0, str.length - 1);
                            model.set({'cardsInHand': str });
                        } else {
                            var str: string = "";
                            for (var i = 0; i < numCardPerPlayer; i++) {
                                str += cards[ci].get("id") + ",";
                                ci++;
                            }
                            str = str.substr(0, str.length - 1);
                            model.set({ 'cardsInHand': str });
                        }
                    }
                });
                


                //console.log(cards[0].get("name") + "|" + cards[1].get("name") + "|" + cards[2].get("name") + "|" + cards[3].get("name"));
                

                
                $.ajax({
                    timeout: 10000,
                    url: Setting.getPhpDir() + "startgame.php",
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
                        View.getInstance().setStatusMessage("Start the game!");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                        that.addEventListener();
                    }
                });
                
                
            });

            that.$('#detect-location').off('click');
            that.$('#detect-location').on('click', function (e) {
                View.getInstance().getMapView().updateMapToCurLocation();
                
            });

            that.$('.character-name').off('click');
            that.$('.character-name').on('click', function (e) {
                var cur: JQuery = $(this);
                $.ajax({
                    url: Setting.getPhpDir() + "selectcharacter.php",
                    type: "POST",
                    data: {
                        id: 1,
                        prevcharacter: Controller.getInstance().getCharacterId(),
                        newcharacter: cur.attr('id'),
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data == 1) {
                            //console.log("success");
                            Router.getInstance().navigate("setup/" + cur.attr('id'), { trigger: false, replace: true });
                            Controller.getInstance().setCharacterId(cur.attr('id'));
                        } else {
                            //console.log("taken");
                            if (Controller.getInstance().getCharacterId() != cur.attr('id')) {
                                that.setMessage("'" + that.$('#' + cur.attr('id')).html() + "' is already taken.");
                            }
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                        that.addEventListener();
                    }
                });
            });
        }

        public showSelectionMenu(location: Location): void {
            var that: WingView = this;
            Controller.getInstance().bShowClaimLocation = true;
            that.$('#claim-location').addClass('disabled');

            var template = _.template(LifeClue.Setting.getInstance().getWingMakeGuessTemplate());
            var data = {
                "locationId": location.get("id"),
                "locationName": location.get("name"),
                "characters": Controller.getInstance().getCharacters(),
                "weapons": Controller.getInstance().getWeapons(),
            }
            that.$('#panel-guess').html(template(data));
            that.addEventListener();
        }

        public showSelectionResult(): void {
            //console.log("showSelectionResult");
            var that: WingView = this;
            Controller.getInstance().bShowClaimLocation = false;
            var suggestion: Array<string> = Controller.getInstance().getGame().get("sg").split(",");
            if (suggestion != undefined) {
                that.$('#claim-location').addClass('disabled');
                that.$('#accusation').addClass('disabled');
                that.$('#panel-guess').html("");
                var template = _.template(LifeClue.Setting.getInstance().getWingShowSuggestionTemplate());

                var location: Location;
                var character: Character;
                var weapon: Weapon;

                var locations: Locations = Controller.getInstance().getLocations();
                $.each(locations.models, function (index: number, model: Location) {
                    if (model.get('id') == suggestion[0]) {
                        location = model;
                    }
                });
                var characters: Characters = Controller.getInstance().getCharacters();
                $.each(characters.models, function (index: number, model: Character) {
                    if (model.get('id') == suggestion[1]) {
                        character = model;
                    }
                });
                var weapons: Weapons = Controller.getInstance().getWeapons();
                $.each(weapons.models, function (index: number, model: Weapon) {
                    if (model.get('id') == suggestion[2]) {
                        weapon = model;
                    }
                });


                var data = {
                    //"player": Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name"),
                    "message": '<b>' + Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name") + "</b> suggested that <b>" + character.get("name") + "</b> commited a crime with a/an <b>" + weapon.get("name") + "</b> at <b>" + location.get("name") + '</b>',
                }
                that.$('#panel-show-suggestion').html(template(data));


                that.addEventListener();

                Controller.getInstance().bShowSuggestionResult = true;
            }
        }

        public showSelectionShowCard(): void {
            //console.log("showSelectionShowCard");
            var that: WingView = this;
            Controller.getInstance().bShowClaimLocation = true;
            // Show card
            var suggestion: Array<string> = Controller.getInstance().getGame().get("sg").split(",");
            //console.log("suggestion");
            //console.log(suggestion);
            var showCardPlayer: Character = Controller.getInstance().getGame().getNextCardHolder(suggestion);
            if (showCardPlayer == null) {   // Winning Condition
                console.log("There is no player to show the card.");
                $.ajax({
                    timeout: 10000,
                    url: Setting.getPhpDir() + "winner.php",
                    type: "POST",
                    data: {
                        id: 1,
                        character: Controller.getInstance().getCharacterId().charAt(1),
                    },
                    success: function (data, textStatus, jqXHR) {
                        //console.log(data);
                        if (data == 1) {
                            //View.getInstance().setStatusMessage("You successfully claim your location at " + closestLocation.get("name") + ".");
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        View.getInstance().setStatusMessage("Unexpected Error. Please try again.");
                        that.addEventListener();
                    }
                });
            } else if (showCardPlayer != null && showCardPlayer.get('id') == Controller.getInstance().getCharacterId()) {
                //console.log(suggestion.toString());
                //console.log(showCardPlayer.get('cardsInHand'));
                var cards: Array<string> = Controller.getInstance().getGame().getMatchCards(suggestion, showCardPlayer.get('cardsInHand').split(","));


                var template = _.template(LifeClue.Setting.getInstance().getWingShowCardTemplate());

                var temp: Array<Backbone.Model> = Array<Backbone.Model>();

                

                var locations: Locations = Controller.getInstance().getLocations();
                $.each(locations.models, function (index: number, model: Location) {
                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i] == model.get('id')) {
                            temp.push(model);
                        }
                    }
                });
                var characters: Characters = Controller.getInstance().getCharacters();
                $.each(characters.models, function (index: number, model: Character) {
                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i] == model.get('id')) {
                            temp.push(model);
                        }
                    }
                });
                var weapons: Weapons = Controller.getInstance().getWeapons();
                $.each(weapons.models, function (index: number, model: Weapon) {
                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i] == model.get('id')) {
                            temp.push(model);
                        }
                    }
                });


                var data = {
                    //"player": Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name"),
                    "cards": temp,
                }
                that.$('#panel-show-card').html(template(data));
                that.addEventListener();
                Controller.getInstance().bShowCardShow = true;
            }
        }

        public showSelectionShowCardResult(): void {
            var that: WingView = this;
            //console.log("showSelectionShowCardResult");
            Controller.getInstance().bShowClaimLocation = false;
            that.$('#claim-location').addClass('disabled');
            that.$('#accusation').addClass('disabled');
            that.$('#panel-guess').html("");

            
            var suggestion: Array<string> = Controller.getInstance().getGame().get("sg").split(",");
            var showCardPlayer: Character = Controller.getInstance().getGame().getNextCardHolder(suggestion);

            if (Controller.getInstance().getGame().get('cc') == parseInt(Controller.getInstance().getCharacterId()[1])) {

                var template = _.template(LifeClue.Setting.getInstance().getWingShowCardResultTemplate1());

                var showedCardId: string = Controller.getInstance().getGame().get('sc');
                var showCard: Backbone.Model;

                var locations: Locations = Controller.getInstance().getLocations();
                $.each(locations.models, function (index: number, model: Location) {
                    if (showedCardId == model.get('id')) {
                        showCard = model;
                    }
                });
                var characters: Characters = Controller.getInstance().getCharacters();
                $.each(characters.models, function (index: number, model: Character) {
                    if (showedCardId == model.get('id')) {
                        showCard = model;
                    }
                });
                var weapons: Weapons = Controller.getInstance().getWeapons();
                $.each(weapons.models, function (index: number, model: Weapon) {
                    if (showedCardId == model.get('id')) {
                        showCard = model;
                    }
                });

                var data = {
                    //"player": Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name"),
                    "message": '<b>' + showCardPlayer.get("name") + "</b> showed you a/an <b>" + showCard.get("name") + "</b> card.",
                }

                $('input[type="checkbox"][data-card="' + showCard.get('id') + '"]').prop({ 'checked': 'checked' });
                $('input[type="text"][data-card="' + showCard.get('id') + '"]').val('From ' + showCardPlayer.get("name") + ".");
                

            } else {
                var template = _.template(LifeClue.Setting.getInstance().getWingShowCardResultTemplate2());

                var data = {
                    //"player": Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name"),
                    "message": '<b>' + showCardPlayer.get("name") + "</b> showed a card to <b>" + Controller.getInstance().getGame().getCharacterMakingSuggestion().get("name") + "</b>.",
                }
            }

            that.$('#panel-show-suggestion').html(template(data));
            that.addEventListener();
            Controller.getInstance().bShowCardShowResult = true;
        }

        public showClaimLocation(): void {
            var that: WingView = this;
            Controller.getInstance().bShowCardShow = false;
            Controller.getInstance().bShowCardShowResult = false;
            Controller.getInstance().bShowSuggestionResult = false;
            that.$('#claim-location').removeClass('disabled');
            that.$('#accusation').removeClass('disabled');
            that.$('#panel-guess').html("");
            that.$('#panel-show-suggestion').html("");
            Controller.getInstance().bShowClaimLocation = true;
        }

        public showWinner(): void {
            var that: WingView = this;
            var template = _.template(LifeClue.Setting.getInstance().getWingShowWinnerTemplate());
            var winner: Character = Controller.getInstance().getCharacters().findWhere({ id: 'c' + Controller.getInstance().getGame().get('wn') + 's' });
            var answer: Array<string> = Controller.getInstance().getGame().get('aw').split(",");

            var location: Location;
            var character: Character;
            var weapon: Weapon;

            var locations: Locations = Controller.getInstance().getLocations();
            $.each(locations.models, function (index: number, model: Location) {
                for (var i = 0; i < answer.length; i++) {
                    if (answer[i] == model.get('id')) {
                        location = model;
                    }
                }
            });
            var characters: Characters = Controller.getInstance().getCharacters();
            $.each(characters.models, function (index: number, model: Character) {
                for (var i = 0; i < answer.length; i++) {
                    if (answer[i] == model.get('id')) {
                        character = model;
                    }
                }
            });
            var weapons: Weapons = Controller.getInstance().getWeapons();
            $.each(weapons.models, function (index: number, model: Weapon) {
                for (var i = 0; i < answer.length; i++) {
                    if (answer[i] == model.get('id')) {
                        weapon = model;
                    }
                }
            });


            var data = {
                "message": '<b>' + winner.get("name") + "</b> discovered the truth of the crime.<br/><b>" + character.get("name") + "</b> commited the crime at <b>" + location.get("name") + "</b> with <b>" + weapon.get("name") + "</b>",
            }
            that.$('#claim-location').addClass('disabled');
            that.$('#panel-show-suggestion').html(template(data));
            View.getInstance().setStatusMessage('<b>' + winner.get("name") + "</b> wins the game.");
        }
    }
} 