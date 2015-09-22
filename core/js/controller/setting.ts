module FruitParent {
    export class Setting {
        private static _instance: Setting = new Setting();
        private baseUrl: string;
        constructor(args?: any) {
            if (Setting._instance) {
                throw new Error("Error: Instantiation failed: Use Setting.getInstance() instead of new.");
            }
            Setting._instance = this;
        }
        public static getInstance(): Setting {
            return Setting._instance;
        }
        public static setBaseUrl(url: string) {
            Setting._instance.baseUrl = url;
        }
        public static getBaseUrl(): string {
            return Setting._instance.baseUrl;
        }
    }
}