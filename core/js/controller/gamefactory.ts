module LifeClue {
    export enum GameStatus{
        NONE, READY, PLAY, END, RESET
    }
    export class GameFactory {
        private static _instance: GameFactory = new GameFactory();
        private baseUrl: string;
        constructor(args?: any) {
            if (GameFactory._instance) {
                throw new Error("Error: Instantiation failed: Use GameFactory.getInstance() instead of new.");
            }
            GameFactory._instance = this;
        }
        public static getInstance(): GameFactory {
            return GameFactory._instance;
        }
        public create(): Backbone.Collection<Game> {
            return new LifeClue.GameTable();
        }
    }
} 