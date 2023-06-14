import { Component, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-calificacion',
  templateUrl: './detalles-calificacion.component.html',
  styleUrls: ['./detalles-calificacion.component.css']
})
export class DetallesCalificacionComponent {
  criteriosXjuegos: any[] = [];
  juego: any;

  constructor(private authService: AuthService, private router: Router) {
    const juegoStr = localStorage.getItem('juego'); // Obtener el archivo guardado en el localStorage
    if (juegoStr !== null) {
      let archivo = JSON.parse(juegoStr); // Convertir el archivo a objeto JSON
      this.juego = archivo[0];
      console.log(this.juego);
    }else{
      console.log("Error equisde");
    }
    this.obtenerCriterioXjuegos();
  }

  volver(){
    this.router.navigateByUrl('/auth/juego');
  }

  async obtenerCriterioXjuegos(): Promise<void> {
    try {
      const data = await this.authService.getCriterioByGames().toPromise();
      for(let i = 0; i<data.length; i++){
        if(data[i].juego===this.juego.nombre){
          this.criteriosXjuegos.push(data[i]);
        }
      }
       // Asigna los datos recibidos a la propiedad 'juegos'
      console.log(data);
      // Realiza cualquier otra operación con los datos recibidos
    } catch (error) {
      console.log(error);
    }
      console.log(this.criteriosXjuegos);
  }

}
