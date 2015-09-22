module FruitParent {
    export class View extends Backbone.View<Backbone.Model> {
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
            var that: View = this;
        }
    }
}