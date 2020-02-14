import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { App_Routing } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,    
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    App_Routing,
    PagesModule,
    ServicesModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
