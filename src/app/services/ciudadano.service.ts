import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { dominio_ws } from '../configuracion-parametros/config';
@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {

  url:string=dominio_ws+`/ciudadano`;
  tabla:string='Ciudadano ';

  constructor(public http:HttpClient) { }

  cargarDatos(){
    let url_ws=`${this.url}/`;
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

  
  cargarDatosID(pk_nivel:number):Observable<any>{
    let url_ws=`${this.url}/${pk_nivel}`;
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

  crud(opcion:string,obj_json:any):Observable<any>{
    let url_ws=`${this.url}/`;
    return this.http.post(url_ws,{opcion:opcion,json:obj_json})
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service CRUD ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp;
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

  crudComplementario(opcion:number,obj_json:any):Observable<any>{
    let url_ws=`${this.url}/ciudadano_complementario`;
    return this.http.post(url_ws,{opcion:opcion,json:obj_json})
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service CRUD ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp;
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