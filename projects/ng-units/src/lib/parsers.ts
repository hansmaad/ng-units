export type QuantityParser = (value: string|number) => number;

export const QuantityParsers: { [name: string]: QuantityParser } = {

    'default' : function(value: string|number) {
        if (typeof value === 'string') {
            const str = value.replace(',', '.');
            return str === '' ? null : Number(str);
        }
        return value;
    }
};
