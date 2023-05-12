import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventosComponent } from './eventos/eventos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ResultadosComponent } from './resultados/resultados.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'categorias', component: CategoriasComponent },
  {path: 'resultados', component: ResultadosComponent },
  {path: 'event', component: EventosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
