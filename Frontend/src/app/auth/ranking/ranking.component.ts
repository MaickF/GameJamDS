import { Component, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  juegos: Juego[] = [
    { nombre: 'Final Fantasy 10', calificacion: 9 },
    { nombre: 'Fable', calificacion: 7 },
    { nombre: 'PayDay', calificacion: 8 },
    { nombre: 'Fornite', calificacion: 6 },
    { nombre: 'Honkai Star Rail', calificacion: 10 },
  ];

  constructor() {
    this.juegos = this.ordenarPorCalificacion(this.juegos);
  }

  private ordenarPorCalificacion(juegos: Juego[]): Juego[] {
    return juegos.sort((a, b) => b.calificacion - a.calificacion);
  }
}