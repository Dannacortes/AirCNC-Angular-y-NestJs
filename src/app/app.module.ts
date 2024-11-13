import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';  // Importa tu AuthService

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule  // Asegúrate de que esté aquí
  ],
  providers: [AuthService],  // Asegúrate de incluir AuthService aquí
  bootstrap: [AppComponent]
})
export class AppModule { }
