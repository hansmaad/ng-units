import { SystemOfUnits } from "./system-of-units.service";

export interface SystemOfUnitsInitializer {
    (system: SystemOfUnits): any;
}

export let systemOfUnitsFactory = (initializer: SystemOfUnitsInitializer) => (() => {
    let system = new SystemOfUnits();
    if (typeof initializer === 'function') {
        initializer(system);
    }
    console.log('created system', system.quantities);
    return system;
});

export let systemOfUnitsProvider = (initializer: SystemOfUnitsInitializer) => 
({ 
    provide: SystemOfUnits,
    useFactory: systemOfUnitsFactory(initializer),
    deps: []
});
