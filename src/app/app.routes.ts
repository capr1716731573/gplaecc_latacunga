import { Routes, RouterModule } from '@angular/router';



const APP_ROUTES: Routes = [
   

    { path: '**', pathMatch: 'full', redirectTo: 'interpolacion' }

   

];


export const App_Routing = RouterModule.forRoot(APP_ROUTES,{useHash:true});
