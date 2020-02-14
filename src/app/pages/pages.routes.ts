import { Routes, RouterModule } from "@angular/router";
import { CiudadanoComponent } from './ciudadano.component';
import { ProblemasComponent } from './problemas.component';
import { ResumenComponent } from './resumen.component';

//COMPONENTES

const pagesRoutes: Routes=[
     //Observables y Promesas
     { path:'ciudadano', component: CiudadanoComponent },
     { path:'problemas/:pk_ciu', component: ProblemasComponent },
     { path:'resumen', component: ResumenComponent },
     { path:'', redirectTo:'ciudadano', pathMatch:'full' }
    //RUTA DE PAGINAS O DE PAGINA PRINCIPAL QUE TIENE TODO HEADER , SIDEBAR , MAIN PAGE
    //ES DECIR PRIMER ROUTER OUTLET
    //ESTE CAMBIO SE HACE DEBIDO A QUE EL LOGIN Y REGISTER SE REDIRECCIONAN A OTRA PAGINA 
    //TOTALMENTE DISTINTA, QUE NO UTILIZA NINGUN COMPONENTE DE 
    
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes); 

