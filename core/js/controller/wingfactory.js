var LifeClue;
(function (LifeClue) {
    var WingFactory = (function () {
        function WingFactory(args) {
            if (WingFactory._instance) {
                throw new Error("Error: Instantiation failed: Use WingFactory.getInstance() instead of new.");
            }
            WingFactory._instance = this;
        }
        WingFactory.getInstance = function () {
            return WingFactory._instance;
        };
        WingFactory.prototype.create = function (viewType, el) {
            return new LifeClue.WingView(viewType, { el: el });
        };
        WingFactory._instance = new WingFactory();
        return WingFactory;
    })();
    LifeClue.WingFactory = WingFactory;
})(LifeClue || (LifeClue = {}));
