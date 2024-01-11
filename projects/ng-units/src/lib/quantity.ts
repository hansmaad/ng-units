import { SimpleUnit, Unit } from './unit';
import { QuantityFormatter, QuantityFormatters } from './formatters';
import { QuantityParser, QuantityParsers } from './parsers';


export interface QuantityDefinition {
    name: string;
    units: { [symbol: string]: number[] };
    formatter?: string;
    parser?: string;
}


export class Quantity {
    name!: string;
    unit!: Unit;
    units: Unit[] = [];
    formatter!: QuantityFormatter;
    parser!: QuantityParser;

    constructor(definition?: QuantityDefinition) {
        if (definition) {
            this.name = definition.name;
            for (const symbol of Object.keys(definition.units)) {
                const def = definition.units[symbol];
                this.units.push(new SimpleUnit(symbol, def[0], def[1]));
            }
            this.unit = this.units[0];
            const formatterName = definition.formatter || 'default';
            const parserName = definition.parser || 'default';
            this.formatter = QuantityFormatters[formatterName];
            this.parser = QuantityParsers[parserName];
        }
    }

    fromBase(value: string|number|undefined|null, unit?: Unit|string): number|null {
        const n = this.parser(value);
        return isNumeric(n) ? this.getUnit(unit).fromBase(n) : null;
    }

    toBase(value: string|number|null|undefined, unit?: Unit|string): number|null {
        const n = this.parser(value);
        return isNumeric(n) ? this.getUnit(unit).toBase(n) : null;
    }

    private getUnit(unit?: string|Unit) {
        return this.findUnit(unit) || this.unit;
    }

    selectUnit(unit?: string|Unit|null) {
        const u = this.findUnit(unit);
        if (u) {
            this.unit = u;
        }
    }

    findUnit(unit?: string|Unit|null): Unit|undefined {
        if (!unit) {
            return;
        }
        const id = typeof unit === 'string' ? unit : unit.symbol;
        const units = this.units;
        for (let i = 0, e = units.length; i !== e; i++) {
            if (units[i].symbol === id) {
                return units[i];
            }
        }
    }

    /**
     * Returns a string containing formatted number and unit symbol (optional).
     * @param value string or number
     */
    print(value: string|number|null|undefined, addUnitSymbol?: boolean, unit?: string|Unit) {
        const number = this.parser(value);
        if (typeof number !== 'number') {
            return '';
        }
        const result = this.formatter(number);
        return addUnitSymbol ? (result + ' ' + this.getUnit(unit).symbol) : result;
    }
}

function isNumeric(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

export function defaultPrint(value: string|number|undefined|null): string {
    const num = QuantityParsers['default'](value);
    return typeof num === 'number' ? QuantityFormatters['default'](num) : '';
}
