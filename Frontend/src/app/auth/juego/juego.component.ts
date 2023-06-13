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

  ngOnInit() {
    const juegoStr = localStorage.getItem('juego'); // Obtener el archivo guardado en el localStorage
    if (juegoStr !== null) {
      let archivo = JSON.parse(juegoStr); // Convertir el archivo a objeto JSON
      this.juego = archivo[0];
      console.log(this.juego);
    }
  }
  reportarJuego(){
    this.router.navigateByUrl('/auth/reporteJuego');
  }

  reportarProblema(){
    this.router.navigateByUrl('/auth/reporteJuego');
  }

  calificar(){
    this.router.navigateByUrl('/auth/reporteJuego');
  }
}
