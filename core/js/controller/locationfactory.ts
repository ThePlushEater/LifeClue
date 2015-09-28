module LifeClue {
    export class LocationFactory {
        private static _instance: LocationFactory = new LocationFactory();
        private baseUrl: string;
        constructor(args?: any) {
            if (LocationFactory._instance) {
                throw new Error("Error: Instantiation failed: Use LocationFactory.getInstance() instead of new.");
            }
            LocationFactory._instance = this;
        }
        public static getInstance(): LocationFactory {
            return LocationFactory._instance;
        }
        public create(): Backbone.Collection<Character> {
            var locations: Backbone.Collection<Location> = new Locations();
            // Temporary Location
            /*
            locations.add(new Character({
                id: "l1",
                name: "North Avenue West",
                bActive: 1,
                latitude: 33.7705034457456,
                longitude: -84.3916752934456,
                radius: 0.00015,
                bAnswer: 0,
            }));

            locations.add(new Character({
                id: "l2",
                name: "Noth Avenue North",
                bActive: 1,
                latitude: 33.770608238850365,
                longitude: -84.39118444919586,
                radius: 0.00015,
                bAnswer: 0,
            }));

            locations.add(new Character({
                id: "l3",
                name: "North Avenue Gym",
                bActive: 1,
                latitude: 33.77005751620701,
                longitude: -84.39126759767534,
                radius: 0.00015,
                bAnswer: 0,
            }));

            locations.add(new Character({
                id: "l4",
                name: "North Avenue Bus Stop",
                bActive: 1,
                latitude: 33.76989029203172,
                longitude: -84.39153850078583,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new Character({
                id: "l5",
                name: "North Avenue Field",
                bActive: 1,
                latitude: 33.76966509629334,
                longitude: -84.39139366149902,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new Character({
                id: "l6",
                name: "North Avenue East",
                bActive: 1,
                latitude: 33.76930834935769,
                longitude: -84.39116567373277,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new Character({
                id: "l7",
                name: "North Avenue South",
                bActive: 1,
                latitude: 33.76932618673975,
                longitude: -84.39160019159318,
                radius: 0.00015,
                bAnswer: 0,
            }));
            */
            
            locations.add(new Character({
                id: "l1",
                name: "Gilbert Library",
                bActive: 1,
                latitude: 33.77406856895522,
                longitude: -84.3955671787262,
                radius: 0.00015,
                bAnswer: 0,
            }));

            locations.add(new Character({
                id: "l2",
                name: "Smith Building", 
                bActive: 1,
                latitude: 33.773658330935895,
                longitude: -84.39533650875092,
                radius: 0.00015,
                bAnswer: 0,
            }));

            locations.add(new Character({
                id: "l3",
                name: "Tech Green", 
                bActive: 1,
                latitude: 33.77414883268575,
                longitude: -84.39707458019257,
                radius: 0.00015,
                bAnswer: 0,
            }));

            locations.add(new Character({
                id: "l4",
                name: "Bus Stop", 
                bActive: 1,
                latitude: 33.773225795244585,
                longitude: -84.3968653678894,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new Character({
                id: "l5",
                name: "Skiles Building", 
                bActive: 1,
                latitude: 33.77386790929988,
                longitude: -84.39594000577928,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new Character({
                id: "l6",
                name: "Crosland Tower", 
                bActive: 1,
                latitude: 33.773988305149494,
                longitude: -84.39517557621004,
                radius: 0.00015,
                bAnswer: 0,
            }));
            locations.add(new Character({
                id: "l7",
                name: "Clough Commons", 
                bActive: 1,
                latitude: 33.77415329177968,
                longitude: -84.39654350280762,
                radius: 0.00015,
                bAnswer: 0,
            }));
            



            return locations;
        }
    }
} 