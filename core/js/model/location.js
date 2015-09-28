var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LifeClue;
(function (LifeClue) {
    var Location = (function (_super) {
        __extends(Location, _super);
        function Location(attributes, options) {
            _super.call(this, attributes, options);
            this.defaults = {
                "id": 0,
                "name": "",
                "bActive": 0,
                "latitude": 0.0,
                "longitude": 0.0,
                "radius": 0.0,
                "bAnswer": 0,
            };
        }
        Location.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.bActive = parseInt(response.bActive);
            response.latitude = parseFloat(response.latitude);
            response.longitude = parseFloat(response.longitude);
            response.radius = parseFloat(response.radius);
            return _super.prototype.parse.call(this, response, options);
        };
        Location.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        return Location;
    })(Backbone.Model);
    LifeClue.Location = Location;
    var Locations = (function (_super) {
        __extends(Locations, _super);
        function Locations(models, options) {
            _super.call(this, models, options);
            this.model = Location;
        }
        return Locations;
    })(Backbone.Collection);
    LifeClue.Locations = Locations;
})(LifeClue || (LifeClue = {}));
