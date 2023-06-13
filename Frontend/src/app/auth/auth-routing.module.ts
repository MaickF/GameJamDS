import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventosComponent } from './eventos/eventos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { Paso1Component } from './paso1/paso1.component';
import { Paso2Component } from './paso2/paso2.component';
import { Paso3Component } from './paso3/paso3.component';
import { ReporteJuegoComponent } from './reporte-juego/reporte-juego.component';
import { JuegoComponent } from './juego/juego.component';
import { RankingComponent } from './ranking/ranking.component';
import { CalificarComponent } from './calificar/calificar.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'categorias', component: CategoriasComponent },
  {path: 'resultados', component: ResultadosComponent },
  {path: 'event', component: EventosComponent},
  {path: 'registro/paso1', component: Paso1Component },
  {path: 'registro/paso2', component: Paso2Component },
  {path: 'registro/paso3', component: Paso3Component },
  {path: 'reporteJuego', component: ReporteJuegoComponent },
  {path: 'juego', component: JuegoComponent },
  {path: 'ranking', component: RankingComponent },
  {path: 'calificar', component: CalificarComponent },
  {path: 'register', redirectTo: 'registro/paso1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
