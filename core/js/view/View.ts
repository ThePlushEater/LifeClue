module LifeClue {
    export class View extends Backbone.View<Backbone.Model> {
        private mapView: Backbone.View<Backbone.Model>;
        private wingView: Backbone.View<Backbone.Model>;
        private markerView: MarkerView;
        private msgTimeout: number;
        private static _instance: View = new View();
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            if (View._instance) {
                throw new Error("Error: Instantiation failed: Use View.getInstance() instead of new.");
            }
            View._instance = this;
            super(options);
        }
        public static setElement(options?: Backbone.ViewOptions<Backbone.Model>): void {
            View._instance.setElement(options.el);
        }
        public static getInstance(): View {
            return View._instance;
        }
        render(): any {
            
        }

        loadBasePageLayout(): void {
            var that: View = this;
            var template = _.template(LifeClue.Setting.getInstance().getPageBaseLayoutTemplate());
            var data = {
                "title": LifeClue.Setting.getInstance().getSiteName(),
                "status": LifeClue.Setting.getInstance().nonAvailableText(),
            }
            that.$el.html(template(data));

            that.addEventListener();
        }

        loadHomePageLayout(): void {
            var that: View = this;
            console.log("loadHomePageLayout");
            that.mapView = MapFactory.getInstance().create(MapViewType.MAIN, that.$('#panel-body'));
            that.mapView.render();
            that.wingView = WingFactory.getInstance().create(WingViewType.SELECTCHARACTER, that.$('#panel-wing'));
            that.wingView.render();
            that.markerView = new MarkerView();
        }

        loadGamePageLayout(): void {
            console.log("loadGamePageLayout");
            var that: View = this;
            that.mapView = MapFactory.getInstance().create(MapViewType.MAIN, that.$('#panel-body'));
            that.mapView.render();
            that.wingView = WingFactory.getInstance().create(WingViewType.NOTE, that.$('#panel-wing'));
            that.wingView.render();
            that.markerView = new MarkerView();
        }

        getMapView(): MapView {
            return <MapView> this.mapView;
        }
        getWingView(): WingView {
            return <WingView> this.wingView;
        }
        getMarkerView(): MarkerView {
            return this.markerView;
        }

        addEventListener(): void {
            var that: View = this;
            that.$('#menu-header').on('click', function () {
                if (that.getWingView().getIsActive()) {
                    that.getWingView().hide();
                } else {
                    that.getWingView().show();
                }
                
            });
        }

        setStatusMessage(msg: string): void {
            var that: View = this;
            that.$('#panel-status').html(msg);
            clearTimeout(that.msgTimeout);
            that.msgTimeout = setTimeout(function () {
                that.$('#panel-status').html("");
            }, Setting.getInstance().getStatusMessageDuration());
        }
    }
}