var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LifeClue;
(function (LifeClue) {
    var Weapon = (function (_super) {
        __extends(Weapon, _super);
        function Weapon(attributes, options) {
            _super.call(this, attributes, options);
            this.defaults = {
                "id": 0,
                "name": "",
                "bAnswer": 0,
            };
        }
        Weapon.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            return _super.prototype.parse.call(this, response, options);
        };
        Weapon.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        return Weapon;
    })(Backbone.Model);
    LifeClue.Weapon = Weapon;
    var Weapons = (function (_super) {
        __extends(Weapons, _super);
        function Weapons(models, options) {
            _super.call(this, models, options);
            this.model = Weapon;
        }
        return Weapons;
    })(Backbone.Collection);
    LifeClue.Weapons = Weapons;
})(LifeClue || (LifeClue = {}));
