
export type QuantityFormatter = (value: number) => string;

export const QuantityFormatters: { [name: string]: QuantityFormatter } = {
    'default': function (value: number): string {
        const abs = Math.abs(value);
        let text;
        if (abs && (abs >= 1e5 || abs <= 1e-2)) {
            text = removeZeroDigits(value.toExponential(3));
        }
        else {
            if (abs > 1) {
                text = value.toFixed(2);
            }
            else {
                text = value.toPrecision(3);
            }
            text = Number(text).toString();
        }
        return text;
    },
    'currency': function (value: number): string {
        return value.toFixed(2);
    }
};

function removeZeroDigits(text: string) {
    return text.replace(/\.?0+e/, 'e');
}
