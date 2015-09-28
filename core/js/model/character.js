var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LifeClue;
(function (LifeClue) {
    var Character = (function (_super) {
        __extends(Character, _super);
        function Character(attributes, options) {
            _super.call(this, attributes, options);
            this.defaults = {
                "id": 0,
                "name": "",
                "bActive": 0,
                "latitude": 0.0,
                "longitude": 0.0,
                "bAnswer": 0,
                "cardsInHand": "",
            };
        }
        Character.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.bActive = parseInt(response.bActive);
            response.latitude = parseFloat(response.latitude);
            response.longitude = parseFloat(response.longitude);
            return _super.prototype.parse.call(this, response, options);
        };
        Character.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        return Character;
    })(Backbone.Model);
    LifeClue.Character = Character;
    var Characters = (function (_super) {
        __extends(Characters, _super);
        function Characters(models, options) {
            _super.call(this, models, options);
            this.model = Character;
        }
        return Characters;
    })(Backbone.Collection);
    LifeClue.Characters = Characters;
})(LifeClue || (LifeClue = {}));
