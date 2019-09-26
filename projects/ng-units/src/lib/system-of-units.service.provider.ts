import { SystemOfUnits } from './system-of-units.service';
import { Quantity, QuantityDefinition } from './quantity';

export interface SystemOfUnitsConfig {
    quantities: QuantityDefinition[];
}

export function systemOfUnitsFactory(config?: SystemOfUnitsConfig) {
    const system = new SystemOfUnits();
    if (config && config.quantities) {
        system.add(...config.quantities.map(q => new Quantity(q)));
    }
    return system;
}
