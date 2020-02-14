import { NgModule } from '@angular/core';
import { UrlSeguraPipe } from './url-segura.pipe';
import { FotoPipe } from './foto.pipe';

@NgModule({
  imports: [
    
  ],
  exports:[
        UrlSeguraPipe,
        FotoPipe
  ],
  declarations: [ UrlSeguraPipe, FotoPipe]
})
//este modulo yo lo importo en la aplicacion
export class PipesModule { }
