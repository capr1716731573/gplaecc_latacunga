import { Component, OnInit } from '@angular/core';
import { CiudadanoService } from '../services/ciudadano.service';
import { CiudadService } from '../services/ciudad.service';
import { EtniaService } from '../services/etnia.service';
import { NacionalidadService } from '../services/nacionalidad.service';
import { ParroquiaService } from '../services/parroquia.service';
import { CiudadanoModel } from '../models/spclat.model';

import * as moment from 'moment';
import swal from 'sweetalert2';
import { Toast } from 'ngx-toastr';
import { ConsultasVariasService } from '../services/consultas-varias.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ciudadano',
  templateUrl: './ciudadano.component.html',
  styles: []
})
export class CiudadanoComponent implements OnInit {
  cargando_tabla:boolean=true;
  listaCiudad:any[]=[];
  listaParroquias:any[]=[];
  listaEtnias:any[]=[];
  listaNacionalidad:any[]=[];
  banderaEsLatacunga:boolean=false;

   //MENSAJES TOAST
   toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  ciudadanoTarget:CiudadanoModel={
    pk_ciu:null,
    cedula_ciu:null,
    nombre_ciu:null,
    fk_etia:null,
    fk_nacionalidad:null,
    fk_ciudad:null,
    fk_parro:null,
    contacto_ciu:null,
    correo:null,
    edad_ciu:null,
    sexo_ciu:null,
    fecha_ciu:null,
    hora_ciu:null,
    detalleproblema_ciu:null,
    pregunta1_ciu:null,
    pregunta2_ciu:null,
    pregunta3_ciu:null
}

  constructor(
    public _ciudadanoService:CiudadanoService,
    public _ciudadService:CiudadService,
    public _etniaService:EtniaService,
    public _nacionalidadService:NacionalidadService,
    public _parroquiaService:ParroquiaService,
    public _consultasVarias:ConsultasVariasService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cargarCiudad();
    this.cargarEtnia();
    this.cargarNacional();
    //this.cargarParroquia();

  }

  cargarCiudad(){
    this.cargando_tabla=true;
    this._ciudadService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaCiudad=Object.values(datos);
          this.cargando_tabla=false;
        });
  }

  cargarEtnia(){
    this._etniaService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaEtnias=Object.values(datos);
        });
  }

  cargarNacional(){
    this._nacionalidadService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaNacionalidad=Object.values(datos);
        });
  }

  cargarParroquia(){
    this._parroquiaService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaParroquias=Object.values(datos);
        });
  }

  guardar(){    
    //Consulta si la cedula es valida
    if(!this.validarCedula(this.ciudadanoTarget.cedula_ciu)){
      swal.fire({
        //position: 'top',
        type: 'error',
        title: `La cédula ingresada no es válida`,
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }

    //Verificar si existe ciudadano
    this._consultasVarias.cargarVerificarCiudadano(this.ciudadanoTarget.cedula_ciu)
      .subscribe((resp:any) => {
        if(resp.numero_ciu > 0){
          swal.fire({
            //position: 'top',
            type: 'warning',
            title: `El ciudadano con ese número de cédula ya esta ingresado`,
            showConfirmButton: false,
            timer: 3000
          })
          return;
        }else{
          if((this.banderaEsLatacunga && this.listaParroquias.length > 0) && !this.ciudadanoTarget.fk_parro){
            swal.fire({
              //position: 'top',
              type: 'warning',
              title: `Debe seleccionar la parroquia, ya que selecciono la ciudad de Latacunga`,
              showConfirmButton: false,
              timer: 3000
            })
            return;
          }
           //Guardar informacion
           this._ciudadanoService.crud('I',this.ciudadanoTarget)
           .subscribe((resp:any) => {
             this.ciudadanoTarget=resp.respuesta.data;
             swal.fire({
               //position: 'top',
               type: 'success',
               title: `Registro Guardado Exitosamente!!`,
               showConfirmButton: false,
               timer: 1500
             })
          
             this.router.navigate(['/problemas',`${this.ciudadanoTarget.pk_ciu}`]);
          
           });
        }
        
      });

   
  }

  validarCedula(cedula: string) {
    // Créditos: Victor Diaz De La Gasca.
    // Autor: Adrián Egüez
    // Preguntamos si la cedula consta de 10 digitos
    if (cedula.length === 10) {
  
      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);
  
      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(1) && digitoRegion <= String(24)) {
  
        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));
  
        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));
  
        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }
  
        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }
  
        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }
  
        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }
  
        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }
  
        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
  
        // Suma total
        const sumaTotal = (pares + impares);
  
        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
  
        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;
  
        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;
  
        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
  
        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }
  
      } else {
        // imprimimos en consola si la region no pertenece
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return false;
    }
    

  }

  changeCiudad(dato:any){
    console.log(JSON.stringify(dato));
    if(dato.hasOwnProperty('nombre_ciudad')){
      if(dato.nombre_ciudad.replace(/ /g, "").toLowerCase() === 'latacunga'){
        this.cargarParroquia();
        this.banderaEsLatacunga=true;
      }else{
        this.listaParroquias=[];
        this.banderaEsLatacunga=false;
      }
    }else{
      this.listaParroquias=[];
      this.banderaEsLatacunga=false;
    }
  }

  clearCiudad(){
    this.listaParroquias=[];
    this.ciudadanoTarget.fk_parro=null;
    this.banderaEsLatacunga=false;
  }

}
