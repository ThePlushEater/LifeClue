var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LifeClue;
(function (LifeClue) {
    (function (MapViewType) {
        MapViewType[MapViewType["NONE"] = 0] = "NONE";
        MapViewType[MapViewType["MAIN"] = 1] = "MAIN";
        MapViewType[MapViewType["SUB"] = 2] = "SUB";
    })(LifeClue.MapViewType || (LifeClue.MapViewType = {}));
    var MapViewType = LifeClue.MapViewType;
    var MapView = (function (_super) {
        __extends(MapView, _super);
        function MapView(viewType, options) {
            var _this = this;
            _super.call(this, options);
            this.createMap = function (position) {
                console.log("MAP CREATE!!");
                var that = _this;
                if (that.leafletMap == undefined) {
                    that.setLocation(new L.LatLng(position.coords.latitude, position.coords.longitude));
                    that.leafletMap = L.map(that.$el[0].id, {
                        closePopupOnClick: true,
                        zoomControl: false,
                        doubleClickZoom: true,
                        touchZoom: true,
                        zoomAnimation: true,
                        markerZoomAnimation: true,
                    }).setView(that.location, that.zoom);
                    L.tileLayer(LifeClue.Setting.getInstance().getTileMapAddress(), {
                        minZoom: LifeClue.Setting.getInstance().getMinZoomLevel(),
                        maxZoom: LifeClue.Setting.getInstance().getMaxZoomLevel(),
                    }).addTo(that.leafletMap);
                    that.leafletMap.invalidateSize(false);
                    that.leafletMap.whenReady(that.afterCreateMap);
                    that.$('.leaflet-control-attribution.leaflet-control').html('');
                }
            };
            this.afterCreateMap = function () {
                var that = _this;
                that.createBasicMapControl();
                LifeClue.View.getInstance().getMarkerView().attachToMap(that.leafletMap);
            };
            this.updateMap = function (position) {
                var that = _this;
                that.setLocation(new L.LatLng(position.coords.latitude, position.coords.longitude));
                if (that.leafletMap != undefined) {
                    that.leafletMap.setView(that.location, that.zoom);
                }
            };
            var that = this;
            that.setElement(options.el);
            that.viewType = viewType;
            that.zoom = LifeClue.Setting.getInstance().getDefaultZoomLevel();
        }
        MapView.prototype.render = function () {
            var that = this;
            if (that.leafletMap == undefined) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(that.createMap);
                }
            }
            else {
                that.leafletMap.invalidateSize(false);
            }
        };
        MapView.prototype.update = function () {
            var that = this;
        };
        MapView.prototype.createBasicMapControl = function () {
            var that = this;
            var template = _.template(LifeClue.Setting.getInstance().getMapBasicControlLayoutTemplate());
            var data = {};
            that.$(".leaflet-top.leaflet-left").html(template(data));
            that.addEventListener();
        };
        MapView.prototype.addEventListener = function () {
            var that = this;
            that.$(".control-button").on("mouseenter", function () {
                that.SetIsMapPanZoomAvailable(false);
            });
            that.$(".control-button").on("touchenter", function () {
                that.SetIsMapPanZoomAvailable(false);
            });
            that.$(".control-button").on("touchstart", function () {
                that.SetIsMapPanZoomAvailable(false);
            });
            that.$(".control-button").on("mouseleave", function () {
                that.SetIsMapPanZoomAvailable(true);
            });
            that.$(".control-button").on("touchend", function () {
                that.SetIsMapPanZoomAvailable(true);
            });
            that.$(".control-button.locate").on("click", function (e) {
                that.leafletMap.setView(that.location, that.zoom);
            });
            that.leafletMap.on("movestart", function (e) {
            });
            that.leafletMap.on("zoomend", function (e) {
                that.zoom = that.leafletMap.getZoom();
            });
        };
        MapView.prototype.updateMapToCurLocation = function () {
            var that = this;
            that.leafletMap.setView(that.location, that.zoom);
        };
        MapView.prototype.getMap = function () {
            return this.leafletMap;
        };
        MapView.prototype.setLocation = function (location) {
            var that = this;
            that.location = location;
        };
        MapView.prototype.getLocation = function () {
            return this.location;
        };
        MapView.prototype.setMapZoom = function (zoom) {
            var that = this;
            that.zoom = zoom;
        };
        MapView.prototype.getMapZoom = function () {
            return this.leafletMap.getZoom();
        };
        MapView.prototype.getMapCenter = function () {
            return this.leafletMap.getCenter();
        };
        MapView.prototype.getMapBounds = function () {
            return this.leafletMap.getBounds();
        };
        MapView.prototype.SetIsMapPanZoomAvailable = function (isAvailable) {
            var that = this;
            if (isAvailable) {
                that.leafletMap.dragging.enable();
                that.leafletMap.touchZoom.enable();
                that.leafletMap.doubleClickZoom.enable();
                that.leafletMap.scrollWheelZoom.enable();
            }
            else {
                that.leafletMap.dragging.disable();
                that.leafletMap.touchZoom.disable();
                that.leafletMap.doubleClickZoom.disable();
                that.leafletMap.scrollWheelZoom.disable();
            }
        };
        return MapView;
    })(Backbone.View);
    LifeClue.MapView = MapView;
})(LifeClue || (LifeClue = {}));
