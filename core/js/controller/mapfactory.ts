module LifeClue {
    export class MapFactory {
        private static _instance: MapFactory = new MapFactory();
        private baseUrl: string;
        constructor(args?: any) {
            if (MapFactory._instance) {
                throw new Error("Error: Instantiation failed: Use MapFactory.getInstance() instead of new.");
            }
            MapFactory._instance = this;
        }
        public static getInstance(): MapFactory {
            return MapFactory._instance;
        }
        public create(viewType: MapViewType, el: JQuery): Backbone.View<Backbone.Model> {
            return new LifeClue.MapView(viewType, {el: el});
        }
    }
}