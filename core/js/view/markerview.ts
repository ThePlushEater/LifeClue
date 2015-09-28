module LifeClue {
    export class MarkerView extends Backbone.View<Backbone.Model> {
        icons: Array<L.Icon>;
        buildingIcon: L.Icon;
        group: L.LayerGroup<L.ILayer>;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var that: MarkerView = this;
            //that.setElement(options.el);

            that.group = new L.LayerGroup();
            
            var characters: Characters = Controller.getInstance().getCharacters();
            if (characters) {
                $.each(characters.models, function (index: number, model: Character) {
                    model.marker = null;
                    model.circle = null;
                });
            }
            var locations: Locations = Controller.getInstance().getLocations();
            if (locations != undefined) {
                $.each(locations.models, function (index: number, model: Location) {
                    model.marker = null;
                    model.circle = null;
                });
            }

            that.icons = new Array<L.Icon>();

            that.icons.push(new L.Icon({
                iconUrl: Setting.getImageDir() + "marker-scarlet.png",
                shadowUrl: Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.icons.push(new L.Icon({
                iconUrl: Setting.getImageDir() + "marker-plum.png",
                shadowUrl: Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.icons.push(new L.Icon({
                iconUrl: Setting.getImageDir() + "marker-peacock.png",
                shadowUrl: Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.icons.push(new L.Icon({
                iconUrl: Setting.getImageDir() + "marker-green.png",
                shadowUrl: Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.icons.push(new L.Icon({
                iconUrl: Setting.getImageDir() + "marker-mustard.png",
                shadowUrl: Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));
            that.icons.push(new L.Icon({
                iconUrl: Setting.getImageDir() + "marker-black.png",
                shadowUrl: Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            }));

            that.buildingIcon = new L.Icon({
                iconUrl: Setting.getImageDir() + "marker-location2.png",
                shadowUrl: Setting.getImageDir() + "marker-shadow.png",
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            });

        }

        attachToMap(map: L.Map): void {
            var that: MarkerView = this;
            that.group.addTo(map);
            console.log("group is attached to map");
        }
        render(): any {
            var that: MarkerView = this;
            var characters: Characters = Controller.getInstance().getCharacters();
            $.each(characters.models, function (index: number, model: Character) {
                if (model.get("bActive") == 1) {
                    if (model.marker == undefined) {
                        model.marker = new L.Marker(new L.LatLng(parseFloat(model.get("latitude")), parseFloat(model.get("longitude"))),
                            {
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
                        })
                        console.log("new marker is created");
                    } else {
                        model.marker.setLatLng(new L.LatLng(parseFloat(model.get("latitude")), parseFloat(model.get("longitude"))));
                        //model.marker.update();
                    }
                } else if (model.get("bActive") == 0) {
                    if (model.marker != undefined && that.group.hasLayer(model.marker)) {
                        that.group.removeLayer(model.marker);
                        model.marker = null;
                    }
                }
            });

            if (Controller.getInstance().gameStatus == GameStatus.PLAY) {
                var locations: Locations = Controller.getInstance().getLocations();
                if (locations != undefined) {
                    $.each(locations.models, function (index: number, model: Location) {
                        if (model.get("bActive") == 1) {
                            if (model.marker == undefined) {
                                model.marker = new L.Marker(new L.LatLng(parseFloat(model.get("latitude")), parseFloat(model.get("longitude"))),
                                    {
                                        icon: that.buildingIcon,
                                        draggable: false,
                                        riseOnHover: true,
                                    }).bindLabel('<span class="location">' + model.get("name") + '</span>', {
                                    noHide: true,
                                    direction: 'left'
                                });
                                that.group.addLayer(model.marker);
                                console.log("new marker is created");
                            } else {
                                model.marker.setLatLng(new L.LatLng(parseFloat(model.get("latitude")), parseFloat(model.get("longitude"))));
                                //model.marker.update();
                            }
                        } else if (model.get("bActive") == 0) {
                            if (model.marker != undefined && that.group.hasLayer(model.marker)) {
                                that.group.removeLayer(model.marker);
                                model.marker = null;
                            }
                        }
                    });
                }
            }

            that.addEventListener();
        }

        update(): any {
            this.render();
        }

        addEventListener(): void {
            var that: MarkerView = this;
        }
    }
} 