module LifeClue {
    export enum MapViewType {
        NONE, MAIN, SUB
    }
    export class MapView extends Backbone.View<Backbone.Model> {
        private viewType: MapViewType;
        private leafletMap: L.Map;
        private location: L.LatLng;
        private zoom: number;
        //private bGeoLocationAvailable: boolean;
        constructor(viewType: MapViewType, options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var that: MapView = this;
            that.setElement(options.el);
            that.viewType = viewType;
            that.zoom = Setting.getInstance().getDefaultZoomLevel();
            //that.bGeoLocationAvailable = true;
        }
        render(): any {
            var that: MapView = this;
            if (that.leafletMap == undefined) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(that.createMap);
                }
            } else {
                that.leafletMap.invalidateSize(false);
            }
        }

        update(): void {
            var that: MapView = this;
            /*
            if (navigator.geolocation && that.bGeoLocationAvailable) {
                navigator.geolocation.getCurrentPosition(that.updateMap);
                that.bLiveTracking = true;
                that.bGeoLocationAvailable = false;
            }
            */
        }
       
        
        createMap = (position: Position) => {
            console.log("MAP CREATE!!");
            var that: MapView = this;
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
                L.tileLayer(Setting.getInstance().getTileMapAddress(), {
                    minZoom: Setting.getInstance().getMinZoomLevel(),
                    maxZoom: Setting.getInstance().getMaxZoomLevel(),
                }).addTo(that.leafletMap);
                that.leafletMap.invalidateSize(false);

                that.leafletMap.whenReady(that.afterCreateMap);

                // remove leaflet thumbnail
                that.$('.leaflet-control-attribution.leaflet-control').html('');
            }
        }

        afterCreateMap = () => {
            var that: MapView = this;
            that.createBasicMapControl();
            View.getInstance().getMarkerView().attachToMap(that.leafletMap);
        }
        
        updateMap = (position: Position) => {
            var that: MapView = this;
            that.setLocation(new L.LatLng(position.coords.latitude, position.coords.longitude));
            if (that.leafletMap != undefined) {
                that.leafletMap.setView(that.location, that.zoom);
                //that.bGeoLocationAvailable = true;
                //console.log("Map Location is updated to current user location at lat: " + that.location.lat + ", lng:" + that.location.lng);
            }
        }
        

        createBasicMapControl(): void {
            var that: MapView = this;
            var template = _.template(LifeClue.Setting.getInstance().getMapBasicControlLayoutTemplate());
            var data = {

            }
            that.$(".leaflet-top.leaflet-left").html(template(data));
            that.addEventListener();
        }

        addEventListener(): void {
            // zoom in and zoom out control.
            var that: MapView = this;
            /*
            that.$(".control-button.zoomin").on("click", function (e) {
                if (that.leafletMap != undefined) {
                    that.leafletMap.zoomIn();
                    that.zoom = that.leafletMap.getZoom();
                }
            });
            that.$(".control-button.zoomout").on("click", function (e) {
                if (that.leafletMap != undefined) {
                    that.leafletMap.zoomOut();
                    that.zoom = that.leafletMap.getZoom();
                }
            });
            */
            // disable map control while mouse is over the control button.
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
            // update geolocation.
            that.$(".control-button.locate").on("click", function (e) {
                //that.updateMapToCurLocation();
                that.leafletMap.setView(that.location, that.zoom)
            });
            // disable live tracking if the user start drag the map location manually.
            that.leafletMap.on("movestart", function (e) {

            });
            that.leafletMap.on("zoomend", function (e) {
                that.zoom = that.leafletMap.getZoom();
            });
        }

        updateMapToCurLocation(): void {
            var that: MapView = this;
            /*
            if (navigator.geolocation && that.bGeoLocationAvailable) {
                navigator.geolocation.getCurrentPosition(that.updateMap);
                that.bGeoLocationAvailable = false;
            }
            */
            that.leafletMap.setView(that.location, that.zoom);
        }

        getMap(): L.Map {
            return this.leafletMap;
        }
        setLocation(location: L.LatLng) {
            var that: MapView = this;
            that.location = location;
        }
        getLocation(): L.LatLng {
            return this.location;
        }

        setMapZoom(zoom: number): void {
            var that: MapView = this;
            that.zoom = zoom;
        }
        getMapZoom(): number {
            return this.leafletMap.getZoom();
        }
        getMapCenter(): L.LatLng {
            return this.leafletMap.getCenter();
        }
        getMapBounds(): L.LatLngBounds {
            return this.leafletMap.getBounds();
        }

        SetIsMapPanZoomAvailable(isAvailable: boolean): void {
            var that: MapView = this;
            if (isAvailable) {
                that.leafletMap.dragging.enable();
                that.leafletMap.touchZoom.enable();
                that.leafletMap.doubleClickZoom.enable();
                that.leafletMap.scrollWheelZoom.enable();
            } else {
                that.leafletMap.dragging.disable();
                that.leafletMap.touchZoom.disable();
                that.leafletMap.doubleClickZoom.disable();
                that.leafletMap.scrollWheelZoom.disable();
            }
        }
    }
}