import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import { EventosComponent } from './eventos/eventos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { Paso1Component } from './paso1/paso1.component';
import { Paso2Component } from './paso2/paso2.component';
import { Paso3Component } from './paso3/paso3.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReporteJuegoComponent } from './reporte-juego/reporte-juego.component';
import { JuegoComponent } from './juego/juego.component';
import { EditarComponent } from './editar/editar.component';
import { CalificarComponent } from './calificar/calificar.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [
    LoginComponent,
    EventosComponent,
    CategoriasComponent,
    ResultadosComponent,
    Paso1Component,
    Paso2Component,
    Paso3Component,
    ReporteJuegoComponent,
    JuegoComponent,
    CalificarComponent,
    EditarComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService]

})
export class AuthModule { }