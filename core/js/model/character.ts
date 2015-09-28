module LifeClue {
    export class Character extends Backbone.Model {
        marker: L.Marker;
        circle: L.Circle;
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            this.defaults = <any>{
                "id": 0,
                "name": "",
                "bActive": 0,
                "latitude": 0.0,
                "longitude": 0.0,
                "bAnswer": 0,
                "cardsInHand": "",
            };
        }
        parse(response: any, options?: any): any {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.bActive = parseInt(response.bActive);
            response.latitude = parseFloat(response.latitude);
            response.longitude = parseFloat(response.longitude);
            return super.parse(response, options);
        }
        toJSON(options?: any): any {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        }
    }
    export class Characters extends Backbone.Collection<Character> {
        constructor(models?: Character[], options?: any) {
            super(models, options);
            this.model = Character;
        }
    }
}