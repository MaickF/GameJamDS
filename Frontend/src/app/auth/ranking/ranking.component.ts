import { Component, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface Juego {
  nombre: string;
  calificacion: number;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {
  juegos: any[] = [];
  criterios: any[] = [];
  criteriosXjuegos: any[] = [];
  evaluaciones: Juego [] = [];

  constructor(private authService: AuthService, private router: Router) {
    //this.juegos = this.ordenarPorCalificacion(this.juegos);
    console.log(this.obtenerNumeroCriterios());
  }

  private ordenarPorCalificacion(juegos: Juego[]): Juego[] {
    return juegos.sort((a, b) => b.calificacion - a.calificacion);
  }

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.authService.getGames().toPromise();
      this.juegos = data; // Asigna los datos recibidos a la propiedad 'juegos'
      console.log(this.juegos);
      // Realiza cualquier otra operación con los datos recibidos
    } catch (error) {
      console.log(error);
    }
    let criterios = await this.obtenerNumeroCriterios();
    let jueces = await this.obtenerNumeroJueces();
    console.log(criterios);
    console.log(jueces);
    await this.obtenerCriterioXjuegos();
    this.calcularNota(criterios, jueces);
  }  

  async obtenerNumeroCriterios(): Promise<number> {
    let resultado: number = 0;
    try {
      const data = await this.authService.getCriterios().toPromise();
      resultado = data.length; // Asigna los datos recibidos a la propiedad 'juegos'
      // Realiza cualquier otra operación con los datos recibidos
    } catch (error) {
      console.log(error);
    }
      console.log(resultado);
      return resultado;
  }

  async obtenerNumeroJueces(): Promise<number> {
    let resultado: number = 0;
    try {
      const data = await this.authService.getJudges().toPromise();
      resultado = data.length; // Asigna los datos recibidos a la propiedad 'juegos'
      // Realiza cualquier otra operación con los datos recibidos
    } catch (error) {
      console.log(error);
    }
      console.log(resultado);
      return resultado;
  }
  
  async obtenerCriterioXjuegos(): Promise<void> {
    try {
      const data = await this.authService.getCriterioByGames().toPromise();
      this.criteriosXjuegos = data; // Asigna los datos recibidos a la propiedad 'juegos'
      console.log(data);
      // Realiza cualquier otra operación con los datos recibidos
    } catch (error) {
      console.log(error);
    }
      console.log(this.criteriosXjuegos);
  }
  calcularNota(totalCriterios:number, totalJueces:number) {
    console.log("Entró a calcular nota con las siguinetes entradas: " + totalCriterios + ", " + totalJueces);
    let total = totalCriterios * totalJueces;
    let resultado = 0;
    let cantidad = 0;
    console.log(this.criteriosXjuegos);
    for(let i = 0; i < this.juegos.length; i++){
      let juegoActual = this.juegos[i].nombre;
      console.log("*texto plano 1");
      for (let j = 0; j < this.criteriosXjuegos.length; j++){
        console.log("*texto plano 2");
        console.log(this.criteriosXjuegos[j].juego);
        console.log(juegoActual);
        if(this.criteriosXjuegos[j].juego === juegoActual) {
          cantidad ++;
          resultado += parseInt(this.criteriosXjuegos[j].nota);
          console.log("Entró al primer if");
          console.log("El resultado actual es de: " + resultado);
        }
      }
      if(cantidad == total){
        let juego: Juego = {
          nombre: juegoActual,
          calificacion: resultado/cantidad
        };
        this.evaluaciones.push(juego);     
      }
      cantidad = 0;
      resultado = 0;
    }
    this.evaluaciones.sort((a, b) => b.calificacion - a.calificacion);
  }
}