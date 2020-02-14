import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { dominio_ws } from '../configuracion-parametros/config';
@Injectable({
  providedIn: 'root'
})
export class ConsultasVariasService {

  url:string=dominio_ws+`/consultas_varias`;
  tabla:string='Consultas Varias ';

  constructor(public http:HttpClient) { }

  
  cargarVerificarCedula(cedula:any):Observable<any>{
    let url_ws=`${this.url}/verificar_cedula/${cedula}`;
    return this.http.get(url_ws)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service Obtener ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        if(err.statusText === 'Unauthorized'){
          swal.fire(
            `Sesión Caducada`,
            'Tiempo de Sesión expirada, dirijase al login del sistema e inicie la sesión nuevamente.',
            'error'
          );
          
        }else{
          swal.fire(
            `Error no controlado en ${this.tabla}`,
            `Revisar Detalle en consola`,
            'error'
          )
        }
        
      
        
        console.log(`Error no controlado - Service Obtener ${this.tabla}= `+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }

  cargarVerificarCiudadano(cedula:any):Observable<any>{
    let url_ws=`${this.url}/verificar_ciudadano/${cedula}`;
    return this.http.get(url_ws)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service Obtener ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        if(err.statusText === 'Unauthorized'){
          swal.fire(
            `Sesión Caducada`,
            'Tiempo de Sesión expirada, dirijase al login del sistema e inicie la sesión nuevamente.',
            'error'
          );
          
        }else{
          swal.fire(
            `Error no controlado en ${this.tabla}`,
            `Revisar Detalle en consola`,
            'error'
          )
        }
        
      
        
        console.log(`Error no controlado - Service Obtener ${this.tabla}= `+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }

  
}