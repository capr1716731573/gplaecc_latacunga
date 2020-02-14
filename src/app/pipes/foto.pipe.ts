import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'foto_pipe'
})
export class FotoPipe implements PipeTransform {


  transform(img: string, tipo: string): any {
    //let url= DOMINIO_GET_IMAGENES+'/'+directorio_ws+'/upload/verArchivo'; para desarrollo local
    let url= 'assets/img';
    if (!img){
      return url + '/no-img.jpg';
    }
    
    switch(tipo){
      case 'A':
        url+='/AMBIENTAL/'+img;
      break;
      case 'EP':
        url+='/ECNOMICO_PRODUCTIVO/'+img;
      break;
      case 'SC':
        url+='/SOCIO_CULTURAL/'+img;
      break;
      case 'AH':
        url+='/ASENTAMIENTOS_HUMANOS/'+img;
      break;
      case 'TM':
        url+='/TRANSPORTE_Y_MOVILIDAD/'+img;
      break;
      case 'ET':
        url+='/ENERGIA_Y_TELECOMUNICACIONES/'+img;
      break;
      case 'PI':
        url+='/POLITICO_INSTITUCIONAL/'+img;
      break;
      case 'R':
        url+='/RIESGOS/'+img;
      break;
      default:
        console.log('Tipo de Imagen no existe, usuario');
    }

     return url;
  }

}
