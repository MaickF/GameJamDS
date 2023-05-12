import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

interface Juego {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) {
    console.log("Entro router " + this.router.url)
  }

  title: string = "Inicio";
  searchValue: string = '';
  error: string = '';

  buscarValor() {
    console.log("Buscando " + this.searchValue);
    this.http.post<Juego[]>('http://localhost:5000/searchGame', { nombre: this.searchValue }).subscribe(
      (response) => {
        this.sharedService.juegos = response;
        this.error = '';
        this.router.navigate(['/auth/resultados']); // Navegar después de asignar los juegos
        console.log("Encontrado " + this.searchValue);
      },
      (error) => {
        this.error = 'Ocurrió un error al buscar los juegos. Por favor, intenta nuevamente.';
      }
    );
  }
  
/*
  buscarValor() {
    console.log("Buscando " + this.searchValue);
    this.http.post<Juego[]>('http://localhost:3000/buscarJuegos', { nombre: this.searchValue }).subscribe(
        (response) => {
          //this.juegos = response;
          //console.log(JSON.stringify(response));
          this.sharedService.juegos = response;
          //this.router.navigate(['/resultados'], { state: { juegos: response } });
          this.error = '';
        },
        (error) => {
          //this.router.navigate(['/resultados'], { state: { juegos: [] } });
          this.error = 'Ocurrió un error al buscar los juegos. Por favor, intenta nuevamente.';
        }
    );
    this.router.navigate(['/resultados']);
    console.log("asdasd");
    if (this.error.length > 0){
      console.log(this.error);
    }
  }*/
}
