import { Component, OnInit } from '@angular/core';
import { Quantity, length, SystemOfUnits, systemOfUnitsProvider } from '../../../../public_api';
import { systemOfUnitsInitializer } from '../../system-of-units-initializer';

@Component({
    selector: 'app-basics',
    templateUrl: './basics.component.html',
    styleUrls: ['./basics.component.scss'],
    providers: [systemOfUnitsProvider(systemOfUnitsInitializer)]
})
export class BasicsComponent implements OnInit {

    title = 'ng';
    quantity = new Quantity(length);
    value = 123;

    constructor() {
        this.quantity.selectUnit('mm');
    }

    ngOnInit() {
    }

}
