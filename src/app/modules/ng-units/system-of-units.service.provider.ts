import { SystemOfUnits } from "./system-of-units.service";

export interface SystemOfUnitsInitializer {
    (system: SystemOfUnits): any;
}

export function systemOfUnitsFactory(initializer: SystemOfUnitsInitializer) {
    let system = new SystemOfUnits();
    if (typeof initializer === 'function') {
        initializer(system);
    }
    return system;
}

export function systemOfUnitsProvider(initializer: SystemOfUnitsInitializer) {
    return {
        provide: SystemOfUnits,
        useFactory: systemOfUnitsFactory(initializer),
        deps: []
   }
};
