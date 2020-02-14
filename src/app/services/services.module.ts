import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CiudadService } from './ciudad.service';
import { EtniaService } from './etnia.service';
import { CiudadanoService } from './ciudadano.service';
import { NacionalidadService } from './nacionalidad.service';
import { ParroquiaService } from './parroquia.service';
import { ProblemasCiudadanoService } from './problemas-ciudadano.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    CiudadService,
    EtniaService,
    CiudadanoService,
    NacionalidadService,
    ParroquiaService,
    ProblemasCiudadanoService
  ]
})
export class ServicesModule { }
