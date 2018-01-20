

export interface Unit {

    fromBase(value: number): number;

}

export class SimpleUnit {

    fromBase(value: number): number {
        return value;
    }
    
}
