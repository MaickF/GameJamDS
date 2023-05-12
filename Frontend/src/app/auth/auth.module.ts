import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import { EventosComponent } from './eventos/eventos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ResultadosComponent } from './resultados/resultados.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    EventosComponent,
    CategoriasComponent,
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService]

})
export class AuthModule { }