import { SystemOfUnitsConfig, length, area, temperature, time, pressure } from 'ng-units';


export function systemOfUnitsInitializer(): SystemOfUnitsConfig {
    return {
        quantities: [area, length, time, temperature, pressure]
    };
}
