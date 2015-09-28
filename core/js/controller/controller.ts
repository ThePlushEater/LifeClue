module LifeClue {
    export class Controller {
        private static _instance: Controller = new Controller();
        private gameTable: GameTable;
        private characters: Characters;
        private locations: Locations;
        private weapons: Weapons;
        private characterId: string;
        private watchId: number;
        public isAutoFilled: boolean;
        public bShowSuggestionResult: boolean;
        public bShowCardShow: boolean;
        public bShowCardShowResult: boolean;
        public bShowClaimLocation: boolean;
        public gameStatus: GameStatus;
        public bFirstLoadingBrowserCache: boolean;
        constructor(args?: any) {
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
            this.gameStatus = GameStatus.NONE;
        }
        public static getInstance(): Controller {
            return Controller._instance;
        }
        public getWatchId(): number {
            return this.watchId;
        }
        public loadHomePage(): void {
            var that: Controller = this;
            navigator.geolocation.clearWatch(that.watchId);
            LifeClue.View.getInstance().loadBasePageLayout();
            LifeClue.View.getInstance().loadHomePageLayout();
            if (this.gameTable == undefined) {
                this.gameTable = <GameTable> GameFactory.getInstance().create();
            }
            if (this.characters == undefined) {
                this.characters = <Characters> CharacterFactory.getInstance().create();
            }
            if (this.locations == undefined) {
                this.locations = <Locations> LocationFactory.getInstance().create();
            }
            if (this.weapons == undefined) {
                this.weapons = <Weapons> WeaponFactory.getInstance().create();
            }
            that.intializeGeoWatch();
        }
        public loadGamePage(): void {
            var that: Controller = this;
            navigator.geolocation.clearWatch(that.watchId);
            LifeClue.View.getInstance().loadBasePageLayout();
            LifeClue.View.getInstance().loadGamePageLayout();
            if (this.gameTable == undefined) {
                this.gameTable = <GameTable> GameFactory.getInstance().create();
            }
            if (this.characters == undefined) {
                this.characters = <Characters> CharacterFactory.getInstance().create();
            }
            if (this.locations == undefined) {
                this.locations = <Locations> LocationFactory.getInstance().create();
            }
            if (this.weapons == undefined) {
                this.weapons = <Weapons> WeaponFactory.getInstance().create();
            }
            that.intializeGeoWatch();
        }

        public intializeGeoWatch(): void {
            var that: Controller = this;
            if (navigator.geolocation) {
                //navigator.geolocation.clearWatch(that.watchId);
                that.watchId = navigator.geolocation.watchPosition(function (position: Position) {
                    if (that.characterId != 'c0s') {
                        $('#gps-status').removeClass('hidden');
                        setTimeout(function () {
                            $('#gps-status').addClass('hidden');
                        }, 500);
                        //console.log("location updated.");
                        View.getInstance().getMapView().setLocation(new L.LatLng(position.coords.latitude, position.coords.longitude));

                    }
                },
                    function () {
                        //console.log("failed to update location.");
                        that.intializeGeoWatch();
                    },
                    {
                        enableHighAccuracy: true, timeout: 5000, maximumAge: 60000
                    }
                );
            }
        }

        public setCharacterId(id: string): void {
            this.characterId = id;
        }
        public getCharacterId(): string {
            return this.characterId;
        }

        public updateFromServer = () => {
            var that: Controller = this;
            
            var location: L.LatLng = View.getInstance().getMapView().getLocation();
            if (location) {
                $.ajax({
                    timeout: 10000,
                    url: Setting.getPhpDir() + "updatelocation.php",
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
                    success(collection?: any, response?: any, options?: any): void {
                        $('#database-status').removeClass('hidden');
                        setTimeout(function () {
                            $('#database-status').addClass('hidden');
                        }, 500);

                        


                        // re-routing based on the game mode.
                        if (collection.models[0].get('sts') == 0) {
                            //console.log("ready mode");
                            if (Controller.getInstance().gameStatus != GameStatus.READY) {
                                Router.getInstance().navigate("setup/" + that.characterId, { trigger: true, replace: true });
                                //window.location.href = Setting.getBaseUrl() + "#setup/" + that.characterId;
                            }
                        } else if (collection.models[0].get('sts') == 1) {
                            //console.log("game mode");
                            if (Controller.getInstance().gameStatus != GameStatus.PLAY) {
                                Router.getInstance().navigate("game/" + that.characterId, { trigger: true, replace: true });
                                //window.location.href = Setting.getBaseUrl() + "#game/" + that.characterId;
                            }
                        } else if (collection.models[0].get('sts') == 2) {
                            //console.log("result mode");
                            if (Controller.getInstance().gameStatus != GameStatus.END) {
                                Router.getInstance().navigate("result/" + that.characterId, { trigger: true, replace: true });
                                //window.location.href = Setting.getBaseUrl() + "#result/" + that.characterId;
                            }
                        }

                        //console.log("success feting data from the server.");
                        View.getInstance().getWingView().update();

                        that.updateCharacters();

                        setTimeout(function () {
                            Controller.getInstance().updateFromServer();
                        }, 3000);

                        //// Auto-fill your cards
                        
                        if (!that.isAutoFilled) {
                            
                            setTimeout(function () {
                                //console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
                                $.each(that.characters.models, function (index: number, model: Character) {
                                    model.set({
                                        'cardsInHand': that.getGame().get('d' + (index + 1))
                                    });
                                });

                                //that.isAutoFilled = true;
                                var player: Character = Controller.getInstance().getYourCharacter();
                                if (player != undefined) {
                                    var cards = player.get('cardsInHand').split(",");
                                    $.each(cards, function (index: number, model: string) {
                                        $('input[type="checkbox"][data-card="' + model + '"]').prop({ "checked": true, "disabled": true });
                                        $('input[type="text"][data-card="' + model + '"]').prop({ "disabled": true }).val("In your hand.");
                                    });
                                    that.isAutoFilled = true;
                                }
                            }, 1500);
                        }


                        //
                        if (that.getGame().get('wn') != 0) {
                            View.getInstance().getWingView().showWinner();
                        } else if (that.getGame().get('cc') == 0 && that.getGame().get('sg') == "" && that.getGame().get('sc') == "") {
                            if (!that.bShowClaimLocation) {
                                setTimeout(function () {
                                    View.getInstance().getWingView().showClaimLocation();
                                }, 1000);
                            }
                        } else if (that.getGame().get('cc') != 0 && that.getGame().get('sg') != "" && that.getGame().get('sc') == "") {
                            if (!that.bShowSuggestionResult) {
                                setTimeout(function () {
                                    View.getInstance().getWingView().showSelectionResult();
                                }, 1000);

                            }
                            if (!that.bShowCardShow) {
                                setTimeout(function () {
                                    View.getInstance().getWingView().showSelectionShowCard();
                                }, 2000);
                            }
                        } else if (that.getGame().get('cc') != 0 && that.getGame().get('sg') != "" && that.getGame().get('sc') != "") {
                            if (!that.bShowCardShowResult) {
                                
                                setTimeout(function () {
                                    View.getInstance().getWingView().showSelectionShowCardResult();
                                }, 1000);
                                
                                
                            }
                        }

                        if (Controller.getInstance().gameStatus == GameStatus.READY) {
                            //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                            $.ajax({
                                timeout: 10000,
                                url: Setting.getPhpDir() + "resetbrowsercache.php",
                                type: "POST",
                                data: {
                                    
                                },
                                success: function (data, textStatus, jqXHR) {
                                    console.log("browser cache is resetted.");
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.log("error.");
                                }
                            });
                        } else {
                            if (that.bFirstLoadingBrowserCache) {
                                that.bFirstLoadingBrowserCache = false;
                                $.ajax({
                                    timeout: 10000,
                                    url: Setting.getPhpDir() + "loadbrowsercache.php",
                                    type: "POST",
                                    data: {
                                        //checkbox: checkbox,
                                        //memo: memo,
                                    },
                                    success: function (data: string, textStatus, jqXHR) {
                                        //console.log("----------------123123123123--------------------");
                                        //console.log(data);
                                        if (data != "") {
                                            var numCheckbox: number = 0;
                                            $.each($('input[type="checkbox"]'), function (index: number, model: any) {
                                                numCheckbox++;
                                            });

                                            //console.log("browser cache is updated.");
                                            var temp1 = data.substr(0, numCheckbox);
                                            var temp2 = data.substr(numCheckbox, data.length);
                                            var temp3: Array<string> = temp2.split("|", numCheckbox);
                                            //console.log(temp1);
                                            //console.log(temp2);
                                            //console.log(temp3);
                                            //console.log(temp3.length);

                                            $.each($('input[type="checkbox"]'), function (index: number, model: any) {
                                                if (temp1.charAt(index) == '1') {
                                                    $(model).prop({ 'checked': 'checked' });
                                                }
                                            });

                                            $.each($('input[type="text"]'), function (index: number, model: any) {
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
                            } else {
                                var checkbox: string = "";
                                var memo: string = "";
                                var checkboxValid: boolean = false;
                                var numCheckbox: number = 0;
                                $.each($('input[type="checkbox"]'), function (index: number, model: any) {
                                    if ($(model).prop('checked') == true) {
                                        checkbox += '1';
                                        checkboxValid = true;
                                    } else {
                                        checkbox += '0';
                                    }
                                    numCheckbox++;
                                });
                                $.each($('input[type="text"]'), function (index: number, model: any) {
                                    checkbox += $(model).val() + " |";
                                });
                                checkbox = checkbox.substr(0, checkbox.length);


                                if (checkboxValid) {

                                    $.ajax({
                                        timeout: 10000,
                                        url: Setting.getPhpDir() + "updatebrowsercache.php",
                                        type: "POST",
                                        data: {
                                            checkbox: checkbox,
                                            memo: memo,
                                        },
                                        success: function (data: string, textStatus, jqXHR) {
                                            //console.log("browser cache is updated.");
                                            var temp1 = data.substr(0, numCheckbox);
                                            var temp2 = data.substr(numCheckbox, data.length);
                                            var temp3: Array<string> = temp2.split("|", numCheckbox);
                                            //console.log("----------------123123123123--------------------");
                                            //console.log(data);

                                            $.each($('input[type="checkbox"]'), function (index: number, model: any) {
                                                if (temp1.charAt(index) == '1') {
                                                    $(model).prop({ 'checked': 'checked' });
                                                }
                                            });

                                            $.each($('input[type="text"]'), function (index: number, model: any) {
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
                            
                            /*
                            
                            */
                        }
                        
                        // Message Constructor
                        that.messageUpdate();
                        
                    },
                    error(collection?: any, response?: any, options?: any): void {
                        console.log(response);
                        console.log(options);
                        console.log("error while fetching data from the server.");
                    }
                });
            }
        }

        public messageUpdate(): void {
            var that: Controller = this;
            if (Controller.getInstance().gameStatus == GameStatus.PLAY) {
                if (that.getGame().get('cc') != 0 && that.getGame().get('sg') != "" && that.getGame().get('sc') == "") {
                    if (that.getGame().get('cc') == parseInt(that.getCharacterId()[1])) {
                        View.getInstance().setStatusMessage("You submit your suggestion. Please wait other's response.");
                    } else {
                        View.getInstance().setStatusMessage('<b>' + that.getGame().getCharacterMakingSuggestion().get("name") + "</b> submitted his suggestion.");
                    }
                } else if (that.getGame().get('cc') != 0 && that.getGame().get('sg') != "" && that.getGame().get('sc') != "") {
                    var suggestion: Array<string> = Controller.getInstance().getGame().get("sg").split(",");
                    var showCardPlayer: Character = Controller.getInstance().getGame().getNextCardHolder(suggestion);
                    if (showCardPlayer != undefined) {
                        View.getInstance().setStatusMessage('<b>' + showCardPlayer.get("name") + "</b> showed a card to <b>" + that.getGame().getCharacterMakingSuggestion().get("name") + "</b>.");
                    }

                } else if (that.getGame().get('cc') != 0 && that.getGame().get('cc') != parseInt(that.getCharacterId()[1])) {
                    if (that.getGame().getCharacterMakingSuggestion() != null) {
                        View.getInstance().setStatusMessage('<b>' + that.getGame().getCharacterMakingSuggestion().get("name") + "</b> is making a suggestion.");
                    }
                }
                
            }
            
        }

        public getGame(): Game {
            if (this.gameTable == undefined) {
                return null;
            }
            return this.gameTable.models[0];
        }
        public getCharacters(): Characters {
            return this.characters;
        }
        public updateCharacters(): void {
            var that: Controller = this;
            var game = that.getGame();
            for (var i = 1; i <= 6; i++) {
                that.characters.findWhere({ id: 'c' + i + 's' }).set({ 
                    bActive: game.get('c' + i + 's'),
                    latitude: game.get('c' + i + 't'),
                    longitude: game.get('c' + i + 'g'),
                });
            }
            View.getInstance().getMarkerView().update();
        }
        public getLocations(): Locations {
            return this.locations;
        }
        public getWeapons(): Weapons {
            return this.weapons;
        }
        public pickCrime(): string {
            var that: Controller = this;
            that.characters.at(Math.floor(Math.random() * that.characters.models.length)).set({ bAnswer: 1 });
            that.locations.at(Math.floor(Math.random() * that.characters.models.length)).set({ bAnswer: 1 });
            that.weapons.at(Math.floor(Math.random() * that.characters.models.length)).set({ bAnswer: 1 });

            console.log("Criminal: " + that.characters.findWhere({ bAnswer: 1 }).get("name"));
            console.log("Location: " + that.locations.findWhere({ bAnswer: 1 }).get("name"));
            console.log("Weapon: " + that.weapons.findWhere({ bAnswer: 1 }).get("name"));

            return that.locations.findWhere({ bAnswer: 1 }).get("id") + "," + that.characters.findWhere({ bAnswer: 1 }).get("id") + "," + that.weapons.findWhere({ bAnswer: 1 }).get("id");
        }
        public getYourCharacter(): Character {
            return this.characters.findWhere({ id: this.characterId });
        }
    }
    export class Router extends Backbone.Router {
        private static _instance: Router = new Router();
        constructor(options?: Backbone.RouterOptions) {
            if (Router._instance) {
                throw new Error("Error: Instantiation failed: Use Router.getInstance() instead of new.");
                
            }
            Router._instance = this;
            // Setup Router parameters
            this.routes = {
                "": "home",
                "setup/:id": "setup",
                "game/:id": "game",
                "result/:id": "result",
                "reset": "reset",
                "status": "status",
            }
            super(options);
            

        }
        public static getInstance(): Router {
            return Router._instance;
        }
        
        home() {
            this.navigate("setup/c0s", { trigger: true, replace: true });
        }
        setup(id: number) {
            console.log("we have loaded the setup page with id: " + id);
            
            Controller.getInstance().setCharacterId(id.toString());
            LifeClue.Controller.getInstance().loadHomePage();
            Controller.getInstance().gameStatus = GameStatus.READY;
            /*
                       setTimeout(function () {
                if (Controller.getInstance().getGame() != undefined) {
                    Controller.getInstance().getGame().setGameStatus(GameStatus.READY);
                }
            }, 5000);
            */
            
        }
        game(id: number) {
            console.log("we have loaded the game page with id: " + id);
            Controller.getInstance().isAutoFilled = false;
            Controller.getInstance().setCharacterId(id.toString());
            LifeClue.Controller.getInstance().loadGamePage();
            Controller.getInstance().gameStatus = GameStatus.PLAY;
            //setTimeout(function () {
                
                /*
                Controller.getInstance().getGame().setGameStatus(GameStatus.PLAY);
                if (Controller.getInstance().getGame() != undefined) {
                    
                }
                */
            //}, 5000);
            
        }
        result(id: number) {
            console.log("we have loaded the result page with id: " + id);
            
            Controller.getInstance().setCharacterId(id.toString());
            /*
            setTimeout(function () {
                if (Controller.getInstance().getGame() != undefined) {
                    Controller.getInstance().getGame().setGameStatus(GameStatus.END);
                }
            }, 500);
            */
        }

        reset() {
            isResetting = true;
            $.ajax({
                timeout: 10000,
                url: Setting.getPhpDir() + "resetgame.php",
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
        }
        status() {
            isResetting = true;
            console.log("!");
            var str: string = "";
            str += "<div>1) Kitchen, 2) Lounge, 3) Library, 4) Dining Room, 5) Hall, 6) Cellar, 7) Conservatory, 8) Ballroom</div><hr>";
            str += "<div>1) Miss Scarlett, 2) Professor Plum, 3) Mrs.Peacock, 4) Reverend Green, 5) Colonel Mustard, 6) Mrs.Black</div><hr>";
            str += "<div>1) Candlestick, 2) Poison, 3) Rope, 4) Gloves, 5) Horseshoe, 6) Knife, 7) Lead Pipe</div><hr>";

            $.ajax({
                timeout: 10000,
                url: Setting.getPhpDir() + "gamestatistic.php",
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
                    url: Setting.getPhpDir() + "gamestatistic.php",
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
            
        }
    }
}