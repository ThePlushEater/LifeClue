var LifeClue;
(function (LifeClue) {
    (function (GameStatus) {
        GameStatus[GameStatus["NONE"] = 0] = "NONE";
        GameStatus[GameStatus["READY"] = 1] = "READY";
        GameStatus[GameStatus["PLAY"] = 2] = "PLAY";
        GameStatus[GameStatus["END"] = 3] = "END";
        GameStatus[GameStatus["RESET"] = 4] = "RESET";
    })(LifeClue.GameStatus || (LifeClue.GameStatus = {}));
    var GameStatus = LifeClue.GameStatus;
    var GameFactory = (function () {
        function GameFactory(args) {
            if (GameFactory._instance) {
                throw new Error("Error: Instantiation failed: Use GameFactory.getInstance() instead of new.");
            }
            GameFactory._instance = this;
        }
        GameFactory.getInstance = function () {
            return GameFactory._instance;
        };
        GameFactory.prototype.create = function () {
            return new LifeClue.GameTable();
        };
        GameFactory._instance = new GameFactory();
        return GameFactory;
    })();
    LifeClue.GameFactory = GameFactory;
})(LifeClue || (LifeClue = {}));
