import { Component, OnInit } from '@angular/core';
import { Quantity, length, SystemOfUnits } from 'ng-units';
import { systemOfUnitsInitializer } from '../../system-of-units-initializer';

@Component({
    selector: 'app-basics',
    templateUrl: './basics.component.html',
    providers: []
})
export class BasicsComponent implements OnInit {

    length: Quantity;
    quantity = new Quantity(length);
    value = 1.25;

    constructor(private system: SystemOfUnits) {
    }

    ngOnInit() {
        this.length = this.system.get('Length');
        this.system.selectUnit(this.quantity, 'mm');
    }

}
