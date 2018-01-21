import { SimpleUnit, Unit, SimpleUnitDefinition } from "./unit";


export interface QuantityDefinition {
    name: string;
    units: { [symbol: string]: number[] }
}

export class Quantity {

    name: string;
    units: Unit[] = [];
    unit: Unit;

    constructor(definition?: QuantityDefinition) {
        if (definition) {
            this.name = definition.name;

            for (let [symbol, def] of Object.entries(definition.units)) {
                this.units.push(new SimpleUnit(symbol, def[0], def[1]));
            }

            this.unit = this.units[0];
        }
    }

    fromBase(value: string|number): number {

        let num = Number(value);
        return this.unit.fromBase(num);

    }


}
