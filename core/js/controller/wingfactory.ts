module LifeClue {
    export class WingFactory {
        private static _instance: WingFactory = new WingFactory();
        private baseUrl: string;
        constructor(args?: any) {
            if (WingFactory._instance) {
                throw new Error("Error: Instantiation failed: Use WingFactory.getInstance() instead of new.");
            }
            WingFactory._instance = this;
        }
        public static getInstance(): WingFactory {
            return WingFactory._instance;
        }
        public create(viewType: WingViewType, el: JQuery): Backbone.View<Backbone.Model> {
            return new LifeClue.WingView(viewType, { el: el });
        }
    }
}