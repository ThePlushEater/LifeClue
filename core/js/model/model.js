var LifeClue;
(function (LifeClue) {
    var Model = (function () {
        function Model() {
            if (Model._instance) {
                throw new Error("Error: Instantiation failed: Use Model.getInstance() instead of new.");
            }
            Model._instance = this;
        }
        Model.getInstance = function () {
            return Model._instance;
        };
        Model._instance = new Model();
        return Model;
    })();
    LifeClue.Model = Model;
})(LifeClue || (LifeClue = {}));
