import { SimpleUnit, Unit, SimpleUnitDefinition } from "./unit";
import { QuantityFormatter, QuantityFormatters } from "./formatters";
import { QuantityParser, QuantityParsers } from "./parsers";


export interface QuantityDefinition {
    name: string;
    units: { [symbol: string]: number[] },
    formatter?: string,
    parser?: string
}


export class Quantity {
    name: string;
    unit: Unit;
    units: Unit[] = [];
    formatter: QuantityFormatter;
    parser: QuantityParser;

    constructor(definition?: QuantityDefinition) {
        if (definition) {
            this.name = definition.name;
            for (let [symbol, def] of Object.entries(definition.units)) {
                this.units.push(new SimpleUnit(symbol, def[0], def[1]));
            }
            this.unit = this.units[0];
            let formatterName = definition.formatter || 'default';
            let parserName = definition.parser || 'default';
            this.formatter = QuantityFormatters[formatterName];
            this.parser = QuantityParsers[parserName];
        }
    }

    fromBase(value: string|number): number {
        var n = this.parser(value);
        return isNotNumeric(n) ? null : this.unit.fromBase(n);
    }

    toBase(value: string|number): number {
        var n = this.parser(value);
        return isNotNumeric(n) ? null : this.unit.toBase(n);
    }

    selectUnit(unit: string|Unit) {
        let u = this.findUnit(unit);
        if (u) {
            this.unit = u;
        }
    }

    findUnit(unit: string|Unit) : Unit {
        let id = typeof unit === 'string' ? unit : unit.symbol;
        let units = this.units;
        for(let i = 0, e = units.length; i != e; i++) {
            if (units[i].symbol === id) {
                return units[i];
            }
        }
    }

    /**
     * Returns a string containing formatted number and unit symbol (optional).
     * @param value string or number
     */
    print(value: string|number, addUnitSymbol?: boolean) {
        let number = this.parser(value);
        if (typeof number !== 'number')
            return '';
        let result = this.formatter(number);
        return addUnitSymbol ? (result + ' ' + this.unit.symbol) : result;
    }
}

function isNotNumeric(value) {
    return value === null || isNaN(value);
}
