module LifeClue {
    export class WeaponFactory {
        private static _instance: WeaponFactory = new WeaponFactory();
        private baseUrl: string;
        constructor(args?: any) {
            if (WeaponFactory._instance) {
                throw new Error("Error: Instantiation failed: Use WeaponFactory.getInstance() instead of new.");
            }
            WeaponFactory._instance = this;
        }
        public static getInstance(): WeaponFactory {
            return WeaponFactory._instance;
        }
        public create(): Backbone.Collection<Weapon> {
            var weapons: Backbone.Collection<Weapon> = new Weapons();
            weapons.add(new Character({
                id: "w1",
                name: "Candlestick",
                bAnswer: 0,
            }));
            weapons.add(new Character({
                id: "w2",
                name: "Poison", 
                bAnswer: 0,
            }));
            weapons.add(new Character({
                id: "w3",
                name: "Rope", 
                bAnswer: 0,
            }));
            weapons.add(new Character({
                id: "w4",
                name: "Gloves", 
                bAnswer: 0,
            }));
            weapons.add(new Character({
                id: "w5",
                name: "Horseshoe", 
                bAnswer: 0,
            }));
            weapons.add(new Character({
                id: "w6",
                name: "Knife", 
                bAnswer: 0,
            }));
            weapons.add(new Character({
                id: "w7",
                name: "Lead Pipe", 
                bAnswer: 0,
            }));

            return weapons;
        }
    }
} 