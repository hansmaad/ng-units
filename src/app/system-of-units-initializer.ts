import { SystemOfUnits, Quantity, length, area, SystemOfUnitsConfig } from "../../public_api";


export function systemOfUnitsInitializer(): SystemOfUnitsConfig {
    return {
        quantities: [area, length]
    }
}
