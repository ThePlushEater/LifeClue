var LifeClue;
(function (LifeClue) {
    var LocationFactory = (function () {
        function LocationFactory(args) {
            if (LocationFactory._instance) {
                throw new Error("Error: Instantiation failed: Use LocationFactory.getInstance() instead of new.");
            }
            LocationFactory._instance = this;
        }
        LocationFactory.getInstance = function () {
            return LocationFactory._instance;
        };
        LocationFactory.prototype.create = function () {
            var locations = new LifeClue.Locations();
            locations.add(new LifeClue.Character({
                id: "l1",
                name: "Gilbert Library",
                bActive: 1,
                latitude: 33.77406856895522,
                longitude: -84.3955671787262,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new LifeClue.Character({
                id: "l2",
                name: "Smith Building",
                bActive: 1,
                latitude: 33.773658330935895,
                longitude: -84.39533650875092,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new LifeClue.Character({
                id: "l3",
                name: "Tech Green",
                bActive: 1,
                latitude: 33.77414883268575,
                longitude: -84.39707458019257,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new LifeClue.Character({
                id: "l4",
                name: "Bus Stop",
                bActive: 1,
                latitude: 33.773225795244585,
                longitude: -84.3968653678894,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new LifeClue.Character({
                id: "l5",
                name: "Skiles Building",
                bActive: 1,
                latitude: 33.77386790929988,
                longitude: -84.39594000577928,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new LifeClue.Character({
                id: "l6",
                name: "Crosland Tower",
                bActive: 1,
                latitude: 33.773988305149494,
                longitude: -84.39517557621004,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new LifeClue.Character({
                id: "l7",
                name: "Clough Commons",
                bActive: 1,
                latitude: 33.77415329177968,
                longitude: -84.39654350280762,
                radius: 0.00015,
                bAnswer: 0,
            }));
            return locations;
        };
        LocationFactory._instance = new LocationFactory();
        return LocationFactory;
    })();
    LifeClue.LocationFactory = LocationFactory;
})(LifeClue || (LifeClue = {}));
