var LifeClue;
(function (LifeClue) {
    var WeaponFactory = (function () {
        function WeaponFactory(args) {
            if (WeaponFactory._instance) {
                throw new Error("Error: Instantiation failed: Use WeaponFactory.getInstance() instead of new.");
            }
            WeaponFactory._instance = this;
        }
        WeaponFactory.getInstance = function () {
            return WeaponFactory._instance;
        };
        WeaponFactory.prototype.create = function () {
            var weapons = new LifeClue.Weapons();
            weapons.add(new LifeClue.Character({
                id: "w1",
                name: "Candlestick",
                bAnswer: 0,
            }));
            weapons.add(new LifeClue.Character({
                id: "w2",
                name: "Poison",
                bAnswer: 0,
            }));
            weapons.add(new LifeClue.Character({
                id: "w3",
                name: "Rope",
                bAnswer: 0,
            }));
            weapons.add(new LifeClue.Character({
                id: "w4",
                name: "Gloves",
                bAnswer: 0,
            }));
            weapons.add(new LifeClue.Character({
                id: "w5",
                name: "Horseshoe",
                bAnswer: 0,
            }));
            weapons.add(new LifeClue.Character({
                id: "w6",
                name: "Knife",
                bAnswer: 0,
            }));
            weapons.add(new LifeClue.Character({
                id: "w7",
                name: "Lead Pipe",
                bAnswer: 0,
            }));
            return weapons;
        };
        WeaponFactory._instance = new WeaponFactory();
        return WeaponFactory;
    })();
    LifeClue.WeaponFactory = WeaponFactory;
})(LifeClue || (LifeClue = {}));
