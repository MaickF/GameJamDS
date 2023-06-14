import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent {
  constructor(private authService: AuthService, private router: Router) { 
    this.rol = localStorage.getItem('rolActual') as string;
  }
  juego: any; // Objeto para almacenar los datos del juego
  rol: String = 'participante';
  nota = 0;

  ngOnInit() {
    const juegoStr = localStorage.getItem('juego'); // Obtener el archivo guardado en el localStorage
    if (juegoStr !== null) {
      let archivo = JSON.parse(juegoStr); // Convertir el archivo a objeto JSON
      this.juego = archivo[0];
      console.log(this.juego);
    }else{
      console.log("Error equisde");
    }
    this.obtenerNota();
  }
  reportarJuego(){
    this.router.navigateByUrl('/auth/reporteJuego');
  }

  reportarProblema(){
    this.router.navigateByUrl('/auth/reporteProblema');
  }

  calificar(){
    this.router.navigateByUrl('/auth/calificar');
  }

  verDetalles(){
    this.router.navigateByUrl('/auth/detallesCalificacion');
  }

  async obtenerNota(): Promise<void> {
    let cantidad = 0;
    try {
      const data = await this.authService.getCriterioByGames().toPromise();
      for(let i = 0; i<data.length; i++){
        if(data[i].juego===this.juego.nombre){
          cantidad++;
          console.log(data[i].nota);
          this.nota+=parseInt(data[i].nota);
        }
      }
       // Asigna los datos recibidos a la propiedad 'juegos'
       this.nota = this.nota/cantidad;
      console.log(this.nota);
      // Realiza cualquier otra operación con los datos recibidos
    } catch (error) {
      console.log(error);
    }
  }
}
