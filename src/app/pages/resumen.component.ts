import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ProblemasCiudadanoService } from '../services/problemas-ciudadano.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  cargando_tabla:boolean=true;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartColors = [
    {
      backgroundColor: [
        'rgb(28, 87, 141,0.5)','rgb(28, 87, 141,0.5)','rgb(28, 87, 141,0.5)','rgb(28, 87, 141,0.5)','rgb(28, 87, 141,0.5)','rgb(28, 87, 141,0.5)','rgb(28, 87, 141,0.5)',
        'rgb(28, 87, 141,0.5)','rgb(28, 87, 141,0.5)','rgb(28, 87, 141,0.5)'
      ],
    },   

  ];
 
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;  
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        'rgb(255, 0, 0,0.5)',
        'rgb(255, 255, 0,0.5)',
        'rgb(0, 255, 0,0.5)',
        'rgb(0, 128, 0,0.5)',
        'rgb(0, 255, 255,0.5)',
        'rgb(0, 0, 255,0.5)',
        'rgb(0, 128, 255,0.5)',
        'rgb(255, 128, 0,0.5)'
      ],
    },   

  ];

  public labelsTotales:Label[] =[];
  public valoresTotales:ChartDataSets[];
  listaAmbientales:any[]=[];
  listaEconomicoProductivo:any[]=[];
  listaSocioCultural:any[]=[];
  listaAsentamientosHumanos:any[]=[];
  listaTransporteMovilidad:any[]=[];
  listaEnergiaTelecomunicaciones:any[]=[];
  listaPoliticoInstitucional:any[]=[];
  listaRiesgos:any[]=[];
 

 dataPrueba:any;

  cargarTotales(lista:any){
      lista=Object.values(lista);
      
      //cargo labeles de totales
     this.labelsTotales.push(lista[0].a.nombre); 
      this.labelsTotales.push(lista[0].ep.nombre);
      this.labelsTotales.push(lista[0].sc.nombre);
      this.labelsTotales.push(lista[0].ah.nombre);
      this.labelsTotales.push(lista[0].tm.nombre);
      this.labelsTotales.push(lista[0].et.nombre);
      this.labelsTotales.push(lista[0].pi.nombre);
      this.labelsTotales.push(lista[0].r.nombre);
      
      //cargo valores de totales
      this.valoresTotales= [
        { data: [
          lista[0].a.total,
          lista[0].ep.total,
          lista[0].sc.total,
          lista[0].ah.total,
          lista[0].tm.total,
          lista[0].et.total,
          lista[0].pi.total,
          lista[0].r.total
        ], label: 'Totales' }
      ];

          
  }

  cargarDatosTipoProblema(lista:any){
    let listaTarget:any[]=[];
    let labels:any[]=[];
    let data:any[]=[];
    let listaReturn:any[]=[];
    listaTarget=Object.values(lista);
    for (let item of listaTarget){
      labels.push(item.nombre_pro);
      data.push(item.cantidad);
    }
    listaReturn.push(labels);
    listaReturn.push(data);
    return listaReturn;
  }

  cargarDatos(){
    this._problemasCiudadano.cargarDatosResumen()
        .subscribe((datos:any)=>{
         /*  console.log(JSON.stringify(datos));
          console.log(JSON.stringify(datos[0].mensaje));
          console.log(JSON.stringify(datos[0].mensaje.totales)); */
          if(datos[0].mensaje){
            if(datos[0].mensaje.totales){
              this.dataPrueba=datos[0].mensaje;
              this.cargarTotales(this.dataPrueba.totales);
              
              this.listaAmbientales=this.cargarDatosTipoProblema(this.dataPrueba.ambientales);
              this.listaEconomicoProductivo=this.cargarDatosTipoProblema(this.dataPrueba.economicoProductivo);
              this.listaSocioCultural=this.cargarDatosTipoProblema(this.dataPrueba.socioCultural);
              this.listaAsentamientosHumanos=this.cargarDatosTipoProblema(this.dataPrueba.asentamientosHumanos);
              this.listaTransporteMovilidad=this.cargarDatosTipoProblema(this.dataPrueba.transporteMovilidad);
              this.listaEnergiaTelecomunicaciones=this.cargarDatosTipoProblema(this.dataPrueba.energiaTelecomunicaciones);
              this.listaPoliticoInstitucional=this.cargarDatosTipoProblema(this.dataPrueba.politicoInstitucional);
              this.listaRiesgos=this.cargarDatosTipoProblema(this.dataPrueba.riesgos);
              this.cargando_tabla=false;
            }else{
              swal.fire({
                type: 'warning',
                title: `Mensaje`,
                text:'No existe información para visualizar en el resumen.',
                showConfirmButton: false,
                timer: 5000
              })
              this.router.navigate(['/ciudadano']);
            }
          }else{
            swal.fire({
              type: 'warning',
              title: `Mensaje`,
              text:'No existe información para visualizar en el resumen.',
              showConfirmButton: false,
              timer: 5000
            })
            this.router.navigate(['/ciudadano']);
          }
          
        });
    
    
  }

  constructor(
    public _problemasCiudadano:ProblemasCiudadanoService,
    public router:Router,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

}
