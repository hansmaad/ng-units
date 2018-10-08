import { 
    SystemOfUnits, Quantity, SystemOfUnitsConfig, 
    length, area, temperature, time, pressure } from "../../public_api";


export function systemOfUnitsInitializer(): SystemOfUnitsConfig {
    return {
        quantities: [area, length, time, temperature, pressure]
    }
}
