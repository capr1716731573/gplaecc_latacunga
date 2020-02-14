import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { ChartsModule } from "ng2-charts";
//Cuando son unos Child Module 
import { CommonModule } from "@angular/common"

//COMPONENTES
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { Loading1Component } from './loading1/loading1.component';
import { Loading2Component } from './loading2/loading2.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    declarations:[
       IncrementadorComponent,
       GraficoDonaComponent,
       Loading1Component,
       Loading2Component
    ],
    exports:[
        IncrementadorComponent,
        GraficoDonaComponent,
        Loading1Component,
        Loading2Component
    ],
    imports:[
        PipesModule,
        CommonModule,
        FormsModule,
        ChartsModule
    ]
})

export class ComponentesReutilizablesModule { }