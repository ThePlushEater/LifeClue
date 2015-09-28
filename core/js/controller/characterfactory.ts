module LifeClue {
    export class CharacterFactory {
        private static _instance: CharacterFactory = new CharacterFactory();
        private baseUrl: string;
        constructor(args?: any) {
            if (CharacterFactory._instance) {
                throw new Error("Error: Instantiation failed: Use CharacterFactory.getInstance() instead of new.");
            }
            CharacterFactory._instance = this;
        }
        public static getInstance(): CharacterFactory {
            return CharacterFactory._instance;
        }
        public create(): Backbone.Collection<Character> {
            var characters: Backbone.Collection<Character> = new Characters();
            characters.add(new Character({
                id: "c1s",
                name: Setting.getInstance().getCharacter1Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            characters.add(new Character({
                id: "c2s",
                name: Setting.getInstance().getCharacter2Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            characters.add(new Character({
                id: "c3s",
                name: Setting.getInstance().getCharacter3Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            characters.add(new Character({
                id: "c4s",
                name: Setting.getInstance().getCharacter4Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            characters.add(new Character({
                id: "c5s",
                name: Setting.getInstance().getCharacter5Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            characters.add(new Character({
                id: "c6s",
                name: Setting.getInstance().getCharacter6Name(),
                bActive: 0,
                latitude: 0,
                longitude: 0,
                bAnswer: 0,
                cardsInHand: "",
            }));
            return characters;
        }
    }
} 