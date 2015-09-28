var LifeClue;
(function (LifeClue) {
    var CharacterFactory = (function () {
        function CharacterFactory(args) {
            if (CharacterFactory._instance) {
                throw new Error("Error: Instantiation failed: Use CharacterFactory.getInstance() instead of new.");
            }
            CharacterFactory._instance = this;
        }
        CharacterFactory.getInstance = function () {
            return CharacterFactory._instance;
        };
        CharacterFactory.prototype.create = function () {
            var characters = new LifeClue.Characters();
            characters.add(new LifeClue.Character({
                id: "c1s",
                name: LifeClue.Setting.getInstance().getCharacter1Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            characters.add(new LifeClue.Character({
                id: "c2s",
                name: LifeClue.Setting.getInstance().getCharacter2Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            characters.add(new LifeClue.Character({
                id: "c3s",
                name: LifeClue.Setting.getInstance().getCharacter3Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            characters.add(new LifeClue.Character({
                id: "c4s",
                name: LifeClue.Setting.getInstance().getCharacter4Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            characters.add(new LifeClue.Character({
                id: "c5s",
                name: LifeClue.Setting.getInstance().getCharacter5Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            characters.add(new LifeClue.Character({
                id: "c6s",
                name: LifeClue.Setting.getInstance().getCharacter6Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            return characters;
        };
        CharacterFactory._instance = new CharacterFactory();
        return CharacterFactory;
    })();
    LifeClue.CharacterFactory = CharacterFactory;
})(LifeClue || (LifeClue = {}));
