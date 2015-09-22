module FruitParent {
    export class Controller {
        private static _instance: Controller = new Controller();
        constructor(args?: any) {
            if (Controller._instance) {
                throw new Error("Error: Instantiation failed: Use Controller.getInstance() instead of new.");
            }
            Controller._instance = this;
        }
        public static getInstance(): Controller {
            return Controller._instance;
        }
    }
    export class Router extends Backbone.Router {
        private static _instance: Router = new Router();
        constructor(options?: Backbone.RouterOptions) {
            if (Router._instance) {
                throw new Error("Error: Instantiation failed: Use Router.getInstance() instead of new.");
                
            }
            Router._instance = this;
            // Setup Router parameters
            this.routes = {
                "": "home",
                "trees": "trees",
                "donations": "donations",
                "tree/:id": "tree",
                "donation/:id": "donation",
            }
            super(options);
            // Start Router
            Backbone.history.start();

        }
        public static getInstance(): Router {
            return Router._instance;
        }
        
        home() {
            //console.log("we have loaded the home page");
            this.navigate("trees", { trigger: true, replace: true });
        }
        trees() {
            console.log("we have loaded the trees");
        }
        donations() {
            console.log("we have loaded the donations");
        }
        tree(id: number) {
            console.log("we have loaded the tree id: " + id);
        }
        donation(id: number) {
            console.log("we have loaded the donation id: " + id);
        }
    }
}  