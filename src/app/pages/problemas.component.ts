import { Component, OnInit } from '@angular/core';
import { ProblemasService } from '../services/problemas.service';
import { ProblemasCiudadanoService } from '../services/problemas-ciudadano.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CiudadanoService } from '../services/ciudadano.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-problemas',
  templateUrl: './problemas.component.html',
  styleUrls: ['./problemas.component.css']
})
export class ProblemasComponent implements OnInit {
  cargando_tabla:boolean=true;
  listaAmbientales:any[]=[];
  listaEconomicoProductivo:any[]=[];
  listaSocioCultural:any[]=[];
  listaAsentamientosHumanos:any[]=[];
  listaTransporteMovilidad:any[]=[];
  listaEnegriaTelecomunicaciones:any[]=[];
  listaPoliticoInstitucional:any[]=[];
  listaRiesgos:any[]=[];
  pk_ciudadano:number=0;
  
  explicaProblema:string="";
  pregunta1:boolean=null;
  pregunta2:boolean=null;
  aux:boolean;

  constructor(
    public _problemasService:ProblemasService,
    public _problemasCiudadanoService:ProblemasCiudadanoService,
    public _ciudadanoService:CiudadanoService,
    public router:Router,
    public activatedRoute:ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params:any) =>{
      this.pk_ciudadano=params['pk_ciu'];//es el mismo nombre que las pagesRoutes
    });
  }

  ngOnInit() {
    this.cargarProblemas();
    this.cargarCiudadano();
  }

  cargarProblemas(){
    this.cargando_tabla=true;
    this._problemasService.cargarDatos(this.pk_ciudadano)
        .subscribe((datos:any)=>{
          
          this.listaAmbientales=Object.values(datos.ambientales);
          this.listaEconomicoProductivo=Object.values(datos.economicoProductivo);
          this.listaSocioCultural=Object.values(datos.socioCultural);
          this.listaAsentamientosHumanos=Object.values(datos.asentamientosHumanos);
          this.listaTransporteMovilidad=Object.values(datos.transporteMovilidad);
          this.listaEnegriaTelecomunicaciones=Object.values(datos.energiaTelecomunicaciones);
          this.listaPoliticoInstitucional=Object.values(datos.politicoInstitucional);
          this.listaRiesgos=Object.values(datos.riesgos);
          this.cargando_tabla=false;
        });
  }

  cargarCiudadano(){
    this._ciudadanoService.cargarDatosID(this.pk_ciudadano)
        .subscribe((ciudadano:any)=>{
          console.log(JSON.stringify(ciudadano));
          this.explicaProblema=ciudadano.detalleproblema_ciu;
          this.pregunta1=ciudadano.pregunta1_ciu;
          this.pregunta2=ciudadano.pregunta2_ciu;
        });
  }

  seleccionProblema(row:any){
    row.existe=!row.existe;
    let listaTarget:any[]=[];
    if(row.tipo_pro === 'A') {
      listaTarget=this.listaAmbientales;
    }else if(row.tipo_pro === 'EP') {
      listaTarget=this.listaEconomicoProductivo;
    }else if(row.tipo_pro === 'SC') {
      listaTarget=this.listaSocioCultural;
    }else if(row.tipo_pro === 'AH') {
      listaTarget=this.listaAsentamientosHumanos;
    }else if(row.tipo_pro === 'TM') {
      listaTarget=this.listaTransporteMovilidad;
    }else if(row.tipo_pro === 'ET') {
      listaTarget=this.listaEnegriaTelecomunicaciones;
    }else if(row.tipo_pro === 'PI') {
      listaTarget=this.listaPoliticoInstitucional;
    }else if(row.tipo_pro === 'R') {
      listaTarget=this.listaRiesgos;
    }
    
    this._problemasCiudadanoService.crud(this.pk_ciudadano,{"fk_pro":row.pk_pro,"tipo_pro":row.tipo_pro,"existe":row.existe})
            .subscribe((datos:any)=>{
              console.log(JSON.stringify(datos));
    });
    /* for (let item of listaTarget){
      if(item.pk_pro != row.pk_pro){
          item.existe=false;
      }else{
        item.existe=true;
        this._problemasCiudadanoService.crud(this.pk_ciudadano,{"fk_pro":row.pk_pro,"tipo_pro":row.tipo_pro,"existe":row.existe})
            .subscribe((datos:any)=>{
              console.log(JSON.stringify(datos));
            });
      }
    } */
  }

  seleccionPregunta(num_pre:number, valor:boolean){
    if(num_pre === 1){
      this.pregunta1=valor;
    }else if(num_pre === 2){
      this.pregunta2=valor;
    }
    
  }

  enviarInfo(num,dato){
    if(num === 3){
      console.log('Problema: '+this.explicaProblema);
    }

    if(num === 1){
      this.pregunta1=dato;
      console.log('Pregunta 1: '+this.pregunta1);
    }

    if(num === 2){
      this.pregunta2=dato;
      console.log('Pregunta 2: '+this.pregunta2);
    }
   
   this.guardarInfoComplementarioCiudadano();
  }

  guardarInfoComplementarioCiudadano(){
    let row:any={
      detalleproblema_ciu :this.explicaProblema,
      pregunta1_ciu : this.pregunta1,
      pregunta2_ciu :  this.pregunta2
    };
    console.log(JSON.stringify(row));
      this._ciudadanoService.crudComplementario(this.pk_ciudadano,row).subscribe((dato:any)=>{
      console.log(JSON.stringify(dato));
    });
  }

  salir(){
    this.guardarInfoComplementarioCiudadano();
    swal.fire({
      type: 'success',
      title: `Gracias`,
      text:'Su información es muy valiosa.',
      showConfirmButton: false,
      timer: 5000
    })
    this.router.navigate(['/ciudadano']);
  }

}
