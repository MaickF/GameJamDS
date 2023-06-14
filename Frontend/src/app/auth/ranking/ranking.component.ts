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

  constructor(private authService: AuthService, private router: Router) {
    //this.juegos = this.ordenarPorCalificacion(this.juegos);
  }

  private ordenarPorCalificacion(juegos: Juego[]): Juego[] {
    return juegos.sort((a, b) => b.calificacion - a.calificacion);
  }

  ngOnInit(): void {
    this.authService.getGames().subscribe(
      data => {
        this.juegos = data; // Asigna los datos recibidos a la propiedad 'events'
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}