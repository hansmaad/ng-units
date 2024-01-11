export type QuantityParser = (value?: string|number|null) => number|null|undefined;

export const QuantityParsers: { [name: string]: QuantityParser } = {

    'default': function(value?: string|number|null) {
        if (typeof value === 'string') {
            const str = value.replace(',', '.');
            return str === '' ? null : Number(str);
        }
        return value;
    }
};
