import { SystemOfUnits, Quantity, length, area } from "../../public_api";


export function systemOfUnitsInitializer(system: SystemOfUnits) {
    system.add(new Quantity(length), new Quantity(area));
}
