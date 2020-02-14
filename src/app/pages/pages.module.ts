import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from "ng2-charts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//COMPONENTES
import { ComponentesReutilizablesModule } from "../componentes-reutilizables/componentes-reutilizables.module";
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MomentModule } from 'ngx-moment';
import { ToastrModule } from 'ngx-toastr';


//DIRECTIVAS
import { NumerosDirective } from '../directivas/numeros/numeros.directive';
import { UpperDirective } from "../directivas/mayusculas/upper.directive";
import { MayusculasDirective } from "../directivas/mayusculas/mayusculas.directive";
import { PipesModule } from '../pipes/pipes.module';
import { CiudadanoComponent } from './ciudadano.component';
import { ProblemasComponent } from './problemas.component';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { PAGES_ROUTES } from './pages.routes';
import { HttpClientModule } from '@angular/common/http';
import { ResumenComponent } from './resumen.component';



@NgModule({
    declarations:[
        NumerosDirective,
        MayusculasDirective,
        UpperDirective,
        CiudadanoComponent,
        ProblemasComponent,
        HeaderComponent,
        FooterComponent,
        ResumenComponent
    ],
    exports:[
        NgxPaginationModule,
        Ng2SearchPipeModule,
        HeaderComponent,
        FooterComponent
    ],
    imports:[
        CommonModule,
        ComponentesReutilizablesModule,
        FormsModule,
        PAGES_ROUTES,
        ReactiveFormsModule,
        ChartsModule,
        NgSelectModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        MomentModule,
        BrowserAnimationsModule,
        PipesModule,
        ToastrModule.forRoot(),
        NgbModule
    ]
})
export class PagesModule { 

}
