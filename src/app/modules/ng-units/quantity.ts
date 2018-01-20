import { Unit } from "./unit";


export class Quantity {

    name: string;
    units: Unit[] = [];
    unit: Unit;

    fromBase(value: string|number): number {

        let num = Number(value);
        return this.unit.fromBase(num);

    }


}
