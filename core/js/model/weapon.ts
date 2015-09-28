module LifeClue {
    export class Weapon extends Backbone.Model {
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            this.defaults = <any>{
                "id": 0,
                "name": "",
                "bAnswer": 0,
            };
        }
        parse(response: any, options?: any): any {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }

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
    export class Weapons extends Backbone.Collection<Weapon> {
        constructor(models?: Weapon[], options?: any) {
            super(models, options);
            this.model = Weapon;
        }
    }
}