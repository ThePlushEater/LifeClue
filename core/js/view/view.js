var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LifeClue;
(function (LifeClue) {
    var View = (function (_super) {
        __extends(View, _super);
        function View(options) {
            if (View._instance) {
                throw new Error("Error: Instantiation failed: Use View.getInstance() instead of new.");
            }
            View._instance = this;
            _super.call(this, options);
        }
        View.setElement = function (options) {
            View._instance.setElement(options.el);
        };
        View.getInstance = function () {
            return View._instance;
        };
        View.prototype.render = function () {
        };
        View.prototype.loadBasePageLayout = function () {
            var that = this;
            var template = _.template(LifeClue.Setting.getInstance().getPageBaseLayoutTemplate());
            var data = {
                "title": LifeClue.Setting.getInstance().getSiteName(),
                "status": LifeClue.Setting.getInstance().nonAvailableText(),
            };
            that.$el.html(template(data));
            that.addEventListener();
        };
        View.prototype.loadHomePageLayout = function () {
            var that = this;
            console.log("loadHomePageLayout");
            that.mapView = LifeClue.MapFactory.getInstance().create(1 /* MAIN */, that.$('#panel-body'));
            that.mapView.render();
            that.wingView = LifeClue.WingFactory.getInstance().create(1 /* SELECTCHARACTER */, that.$('#panel-wing'));
            that.wingView.render();
            that.markerView = new LifeClue.MarkerView();
        };
        View.prototype.loadGamePageLayout = function () {
            console.log("loadGamePageLayout");
            var that = this;
            that.mapView = LifeClue.MapFactory.getInstance().create(1 /* MAIN */, that.$('#panel-body'));
            that.mapView.render();
            that.wingView = LifeClue.WingFactory.getInstance().create(2 /* NOTE */, that.$('#panel-wing'));
            that.wingView.render();
            that.markerView = new LifeClue.MarkerView();
        };
        View.prototype.getMapView = function () {
            return this.mapView;
        };
        View.prototype.getWingView = function () {
            return this.wingView;
        };
        View.prototype.getMarkerView = function () {
            return this.markerView;
        };
        View.prototype.addEventListener = function () {
            var that = this;
            that.$('#menu-header').on('click', function () {
                if (that.getWingView().getIsActive()) {
                    that.getWingView().hide();
                }
                else {
                    that.getWingView().show();
                }
            });
        };
        View.prototype.setStatusMessage = function (msg) {
            var that = this;
            that.$('#panel-status').html(msg);
            clearTimeout(that.msgTimeout);
            that.msgTimeout = setTimeout(function () {
                that.$('#panel-status').html("");
            }, LifeClue.Setting.getInstance().getStatusMessageDuration());
        };
        View._instance = new View();
        return View;
    })(Backbone.View);
    LifeClue.View = View;
})(LifeClue || (LifeClue = {}));
