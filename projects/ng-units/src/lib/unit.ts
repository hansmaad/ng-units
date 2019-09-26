export interface Unit {
    symbol: string;
    fromBase(value: number): number;
    toBase(value: number): number;
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
        return value * this.factor - this.offset;
    }

    toBase(value: number): number {
        return (value + this.offset) / this.factor;
    }
}
