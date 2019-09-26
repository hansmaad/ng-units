import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DemoComponent } from './demo.component';

const routes: Routes = [
    {
        path: 'demo', component: DemoComponent,
        children: [
            {
                path: '',
                component: MainComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }
