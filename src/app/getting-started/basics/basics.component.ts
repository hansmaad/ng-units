import { Component, OnInit } from '@angular/core';
import { Quantity, length, QuantityService } from '../../../../public_api';

@Component({
    selector: 'app-basics',
    templateUrl: './basics.component.html',
    styleUrls: ['./basics.component.scss'],
    providers: [QuantityService]
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
