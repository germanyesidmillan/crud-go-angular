import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GriduserComponent } from './components/griduser/griduser.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { HttpClientModule } from "@angular/common/http";
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PrincipalComponent,
    RegistroComponent,
    GriduserComponent,
    FormularioComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    RegistroComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
