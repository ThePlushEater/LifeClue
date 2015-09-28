module LifeClue {
    export class Game extends Backbone.Model {
        url: string = "gametable.php";
        //private gameStatus: GameStatus;
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            this.url = Setting.getPhpDir() + this.url;
            this.defaults = <any>{
                "id": 0,
                "sts": 0,   // 0: ready, 1: game, 2: end
                "c0s": 0,
                "c1s": 0,
                "c2s": 0,
                "c3s": 0,
                "c4s": 0,
                "c5s": 0,
                "c6s": 0,
                "c1t": 0,
                "c1g": 0,
                "c2t": 0,
                "c2g": 0,
                "c3t": 0,
                "c3g": 0,
                "c4t": 0,
                "c4g": 0,
                "c5t": 0,
                "c5g": 0,
                "c6t": 0,
                "c6g": 0,
            };
            //this.gameStatus = GameStatus.NONE;
        }
        parse(response: any, options?: any): any {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.sts = parseInt(response.sts);

            response.c0s = parseInt(response.c0s);
            response.c1s = parseInt(response.c1s);
            response.c2s = parseInt(response.c2s);
            response.c3s = parseInt(response.c3s);
            response.c4s = parseInt(response.c4s);
            response.c5s = parseInt(response.c5s);
            response.c6s = parseInt(response.c6s);

            response.c1t = parseFloat(response.c1t);
            response.c1g = parseFloat(response.c1g);
            response.c2t = parseFloat(response.c2t);
            response.c2g = parseFloat(response.c2g);
            response.c3t = parseFloat(response.c3t);
            response.c3g = parseFloat(response.c3g);
            response.c4t = parseFloat(response.c4t);
            response.c4g = parseFloat(response.c4g);
            response.c5t = parseFloat(response.c5t);
            response.c5g = parseFloat(response.c5g);
            response.c6t = parseFloat(response.c6t);
            response.c6g = parseFloat(response.c6g);

            response.r1 = parseInt(response.r1);
            response.r2 = parseInt(response.r2);
            response.r3 = parseInt(response.r3);
            response.r4 = parseInt(response.r4);
            response.r5 = parseInt(response.r5);
            response.r6 = parseInt(response.r6);

            response.cc = parseInt(response.cc);

            return super.parse(response, options);
        }
        toJSON(options?: any): any {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        }
        //public setGameStatus(status: GameStatus): void {
        //    this.gameStatus = status;
        //}
        //public getGameStatus(): GameStatus {
        //    return this.gameStatus;
        //}
        public getNumPlayers(): number {
            var numPlayers: number = 0;
            for (var i = 1; i <= 6; i++) {
                if (this.get('c' + i + 's') == 1) {
                    numPlayers++;
                }
            }
            return numPlayers;
        }
        public getCharacterMakingSuggestion(): Character {
            return Controller.getInstance().getCharacters().findWhere({ id: 'c' + this.get('cc') + 's' });
        }
        public getNextCardHolder(cards: Array<string>): Character {
            var that: Game = this;
            var currentSuggester = that.getCharacterMakingSuggestion();
            var currentSuggesterIdNumber = parseInt(currentSuggester.get('id')[1]);
            //console.log("currentSuggesterIdNumber: " + currentSuggesterIdNumber);
            for (var i = 1; i <= 8; i++) {
                
                var checkId: number = mod((currentSuggesterIdNumber + i), 7);
                //console.log("checkId : " + checkId);
                var checkPlayer: Character = Controller.getInstance().getCharacters().findWhere({ id: 'c' + checkId + 's' });
                if (checkPlayer == undefined) {

                } else {
                    var checkPlayerCards: Array<string> = checkPlayer.get('cardsInHand').split(",");
                    for (var j = 0; j < cards.length; j++) {
                        for (var k = 0; k < checkPlayerCards.length; k++) {
                            if (cards[j] == checkPlayerCards[k]) {
                                //console.log(cards[j] + "|" + checkPlayerCards[k]);
                                //console.log(checkPlayer);
                                return checkPlayer;
                            }
                        }
                    }
                }
                
            }
            return null;
        }
        public getMatchCards(cards1: Array<string>, cards2: Array<string>): Array<string> {
            var temp: Array<string> = new Array<string>();
            for (var j = 0; j < cards1.length; j++) {
                for (var k = 0; k < cards2.length; k++) {
                    if (cards1[j] == cards2[k]) {
                        temp.push(cards1[j]);
                    }
                }
            }
            return temp;
        }
    }
    export class GameTable extends Backbone.Collection<Game> {
        url: string = "gametable.php";
        constructor(models?: Game[], options?: any) {
            super(models, options);
            this.model = Game;
            this.url = Setting.getPhpDir() + this.url;
        }

        
    }
}