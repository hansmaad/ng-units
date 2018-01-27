import { SystemOfUnits, Quantity, length, area } from "../../public_api";


export const systemOfUnitsInitializer = (system: SystemOfUnits) => {
    system.add(new Quantity(length), new Quantity(area));
}
