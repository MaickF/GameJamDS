import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


interface Game {
  id: number;
  nombre: string;
  descripcion: string;
  rating: string;
  plataforma: string;
  categoria: string;
  imagen: string;
  engine: String;
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})


export class CategoriasComponent {
  title: string = 'Category';
  currentCategory: string = "All";
  currentCategoryHover: string = "";
  games: Game[] = [];

  categories: string[] = [
    'All',
    'Action',
    'Adventure',
    'Horror',
    'Metroidvania',
    'Racing',
    'Role-playing',
    'Simulation',
    'Sports',
    'Strategy'
  ];

  categoriesES: { [key: string]: string } = {
    'All': 'Mostrar todos',
    'Action': 'Acción',
    'Adventure': 'Aventura',
    'Horror': 'Horror',
    'Metroidvania': 'Metroidvania',
    'Racing': 'Carreras',
    'Role-playing': 'Rol',
    'Simulation': 'Simulación',
    'Sports': 'Deportes',
    'Strategy': 'Estrategia'
  };
  
  constructor(private http: HttpClient, private router: Router) {
    this.showAllGames();
    console.log("Entro router " + this.router.url);
  }


  setCategory(category: string) {
    this.currentCategory = category;
    if (this.currentCategory == "All"){
      this.showAllGames();
    } else {
      this.showCategory(this.categoriesES[this.currentCategory]);
    }
  }

  showAllGames(){
    this.http.get('http://localhost:5000/getAllGames').subscribe(
      (response: Object) => {
        if (Array.isArray(response) && response.length > 0) {
          response.forEach((game: any) => {
            this.games = response;
            console.log("Nombre del juego:", game.nombre);
          });
        } else {
          console.log("La respuesta no es un array válido");
        }

      },
      (error) => {
        console.log(error);
      }
    );
    console.log("Termino el showCategory");
  }

  showCategory(category: string){
    this.http.post('http://localhost:5000/filterByCategory', { category: category }).subscribe(
      (response: Object) => {
        if (Array.isArray(response) && response.length > 0) {
          response.forEach((game: any) => {
            this.games = response;
            console.log("Nombre del juego:", game.nombre);
          });
        } else {
          this.games = [];
          console.log("La respuesta no es un array válido");
        }

      },
      (error) => {
        console.log(error);
      }
    );
    console.log("Termino el showCategory('" + category + "')");
  }

  // Function to highlight the category
  highlightCategory(category: string) {
    this.currentCategoryHover = category;
  }

  // Function to reset the category highlight
  resetHighlight() {
    this.currentCategoryHover = '';
  }
}
