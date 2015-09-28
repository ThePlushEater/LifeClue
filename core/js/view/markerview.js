var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LifeClue;
(function (LifeClue) {
    var MarkerView = (function (_super) {
        __extends(MarkerView, _super);
        function MarkerView(options) {
            _super.call(this, options);
            var that = this;
            that.group = new L.LayerGroup();
            var characters = LifeClue.Controller.getInstance().getCharacters();
            if (characters) {
                $.each(characters.models, function (index, model) {
                    model.marker = null;
                    model.circle = null;
                });
            }
            var locations = LifeClue.Controller.getInstance().getLocations();
            if (locations != undefined) {
                $.each(locations.models, function (index, model) {
                    model.marker = null;
                    model.circle = null;
                });
            }
            that.icons = new Array();
            that.icons.push(new L.Icon({
                iconUrl: LifeClue.Setting.getImageDir() + "marker-scarlet.png",
                shadowUrl: LifeClue.Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.icons.push(new L.Icon({
                iconUrl: LifeClue.Setting.getImageDir() + "marker-plum.png",
                shadowUrl: LifeClue.Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.icons.push(new L.Icon({
                iconUrl: LifeClue.Setting.getImageDir() + "marker-peacock.png",
                shadowUrl: LifeClue.Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.icons.push(new L.Icon({
                iconUrl: LifeClue.Setting.getImageDir() + "marker-green.png",
                shadowUrl: LifeClue.Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.icons.push(new L.Icon({
                iconUrl: LifeClue.Setting.getImageDir() + "marker-mustard.png",
                shadowUrl: LifeClue.Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.icons.push(new L.Icon({
                iconUrl: LifeClue.Setting.getImageDir() + "marker-black.png",
                shadowUrl: LifeClue.Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.buildingIcon = new L.Icon({
                iconUrl: LifeClue.Setting.getImageDir() + "marker-location2.png",
                shadowUrl: LifeClue.Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            });
        }
        MarkerView.prototype.attachToMap = function (map) {
            var that = this;
            that.group.addTo(map);
            console.log("group is attached to map");
        };
        MarkerView.prototype.render = function () {
            var that = this;
            var characters = LifeClue.Controller.getInstance().getCharacters();
            $.each(characters.models, function (index, model) {
                if (model.get("bActive") == 1) {
                    if (model.marker == undefined) {
                        model.marker = new L.Marker(new L.LatLng(parseFloat(model.get("latitude")), parseFloat(model.get("longitude"))), {
                            icon: that.icons[index],
                            draggable: false,
                            riseOnHover: true,
                        }).bindLabel('<span class="character-' + (index + 1) + '">' + model.get("name") + '</span>', {
                            noHide: true,
                            direction: 'auto'
                        });
                        that.group.addLayer(model.marker);
                        model.marker.on('click', function (e) {
                            this.openPopup();
                            console.log("pop up");
                        });
                        console.log("new marker is created");
                    }
                    else {
                        model.marker.setLatLng(new L.LatLng(parseFloat(model.get("latitude")), parseFloat(model.get("longitude"))));
                    }
                }
                else if (model.get("bActive") == 0) {
                    if (model.marker != undefined && that.group.hasLayer(model.marker)) {
                        that.group.removeLayer(model.marker);
                        model.marker = null;
                    }
                }
            });
            if (LifeClue.Controller.getInstance().gameStatus == 2 /* PLAY */) {
                var locations = LifeClue.Controller.getInstance().getLocations();
                if (locations != undefined) {
                    $.each(locations.models, function (index, model) {
                        if (model.get("bActive") == 1) {
                            if (model.marker == undefined) {
                                model.marker = new L.Marker(new L.LatLng(parseFloat(model.get("latitude")), parseFloat(model.get("longitude"))), {
                                    icon: that.buildingIcon,
                                    draggable: false,
                                    riseOnHover: true,
                                }).bindLabel('<span class="location">' + model.get("name") + '</span>', {
                                    noHide: true,
                                    direction: 'left'
                                });
                                that.group.addLayer(model.marker);
                                console.log("new marker is created");
                            }
                            else {
                                model.marker.setLatLng(new L.LatLng(parseFloat(model.get("latitude")), parseFloat(model.get("longitude"))));
                            }
                        }
                        else if (model.get("bActive") == 0) {
                            if (model.marker != undefined && that.group.hasLayer(model.marker)) {
                                that.group.removeLayer(model.marker);
                                model.marker = null;
                            }
                        }
                    });
                }
            }
            that.addEventListener();
        };
        MarkerView.prototype.update = function () {
            this.render();
        };
        MarkerView.prototype.addEventListener = function () {
            var that = this;
        };
        return MarkerView;
    })(Backbone.View);
    LifeClue.MarkerView = MarkerView;
})(LifeClue || (LifeClue = {}));
