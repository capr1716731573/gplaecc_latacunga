import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  
  anio:any;

  constructor() {
    this.anio=new Date();
    this.anio=this.anio.getFullYear();
   }

  ngOnInit() {
  }

}
