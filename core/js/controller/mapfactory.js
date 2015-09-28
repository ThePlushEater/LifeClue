var LifeClue;
(function (LifeClue) {
    var MapFactory = (function () {
        function MapFactory(args) {
            if (MapFactory._instance) {
                throw new Error("Error: Instantiation failed: Use MapFactory.getInstance() instead of new.");
            }
            MapFactory._instance = this;
        }
        MapFactory.getInstance = function () {
            return MapFactory._instance;
        };
        MapFactory.prototype.create = function (viewType, el) {
            return new LifeClue.MapView(viewType, { el: el });
        };
        MapFactory._instance = new MapFactory();
        return MapFactory;
    })();
    LifeClue.MapFactory = MapFactory;
})(LifeClue || (LifeClue = {}));
