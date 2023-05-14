import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


interface Juego {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string;
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})


export class CategoriasComponent {

  title = 'Category';
  indiceCategoriaActual = 1;

  constructor(private http: HttpClient, private router: Router) {
    this.showCategory()
    console.log("Entro router "  + this.router.url)
  }

  categoryNames = ["Action", "Adventure", "Horror", "Metroidvania", "Racing", "Role-playing", "Simulation", "Sports", "Strategy"];
  categoryNamesES = [ "Acción", "Aventura", "Horror", "Metroidvania", "Carreras", "Rol", "Simulación", "Deportes", "Estrategia"];
  currentCategoryName  = this.categoryNames[this.indiceCategoriaActual];
  imagenes = this.categoryNames.map(category => `./assets/images/${category.toLowerCase()}.png`);
  juegosCategoria: string[] = [];


  next() {
    this.indiceCategoriaActual++;
    if (this.indiceCategoriaActual >= this.imagenes.length) {
      this.indiceCategoriaActual = 0;
    }
    this.updateCategories();
  }

  prev() {
    this.indiceCategoriaActual--;
    if (this.indiceCategoriaActual < 0) {
      this.indiceCategoriaActual = this.imagenes.length - 1;
    }
    this.updateCategories();
  }

  updateCategories() {
    const nextIndex = (this.indiceCategoriaActual - 1 + this.imagenes.length) % this.imagenes.length;
    const prevIndex = (this.indiceCategoriaActual + 1) % this.imagenes.length;
    const categoriaPreviaElement: HTMLImageElement = document.getElementById("categoria-previa") as HTMLImageElement;
    const categoriaSiguienteElement: HTMLImageElement = document.getElementById("categoria-siguiente") as HTMLImageElement;
    categoriaPreviaElement.src = this.imagenes[prevIndex];
    categoriaSiguienteElement.src = this.imagenes[nextIndex];
    this.currentCategoryName  = this.categoryNames[this.indiceCategoriaActual];
    this.setCategoryName();
    this.showCategory();
  }

  setCategoryName() {
    const categoriaTextoElement: HTMLDivElement = document.getElementById("categoria-texto") as HTMLDivElement;
    categoriaTextoElement.innerText = this.currentCategoryName;
  }

  showCategory() {
    const searchValue = this.categoryNamesES[this.indiceCategoriaActual];
    this.http.post('http://localhost:5000/filterByCategory', { category: searchValue }).subscribe(
      (response: Object) => { 
        if (Array.isArray(response) && response.length > 0) {
          response.forEach((game: any) => {
            console.log("Nombre del juego:", game.nombre);
            this.juegosCategoria = response.map((game: any) => game.nombre);
          });
        } else {
          console.log("La respuesta no es un array válido");
          this.juegosCategoria = ["No existen juegos catalogados dentro de esta categoría."];
        }
        
      },
      (error) => {
        console.log(error);
      }
    );
    console.log("Termino el showCategory");
  }

}
