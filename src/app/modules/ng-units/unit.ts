import { defineComponent } from "@angular/core/src/render3/definition";



export interface Unit {

    symbol: string;

    fromBase(value: number): number;

}

export interface SimpleUnitDefinition {
    symbol: string;
    factor: number;
    offset?: number;
}

export class SimpleUnit {


    constructor(public symbol: string, public factor: number, public offset: number = 0) {
    }

    fromBase(value: number): number {
        return value * this.factor;
    }
    
}
