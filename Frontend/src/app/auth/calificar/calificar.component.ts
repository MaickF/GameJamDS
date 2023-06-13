import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Actualiza la ruta según tu estructura de archivos


@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.css']
})
export class CalificarComponent {
  criterios: any[] = [];
  criterioActual: any;
  nota: number = 0;
  registroCriterios: any[] = [];
  ultimoCriterio: boolean = false;
  juego:any;
  juez:any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerCriterios();
    const juegoStr = localStorage.getItem('juego'); // Obtener el archivo guardado en el localStorage
    if (juegoStr !== null) {
      let archivo = JSON.parse(juegoStr); // Convertir el archivo a objeto JSON
      this.juego = archivo[0].nombre;
      console.log(this.juego);
    }
    const juezStr = localStorage.getItem('usuario'); // Obtener el archivo guardado en el localStorage
    if (juezStr !== null) {
      let archivo = JSON.parse(juezStr); // Convertir el archivo a objeto JSON
      this.juez = archivo[0].nombre;
      console.log(this.juego);
    }
  }

  obtenerCriterios(): void {
    this.authService.getCriterios().subscribe(criterios => {
      this.criterios = criterios;
      this.criterioActual = this.criterios[0];
      console.log(this.criterios);
      console.log(this.criterioActual);
    });
  }

  avanzarCriterio(): void {
    const registroCriterio = {
      nombre: this.criterioActual.criterio,
      nota: this.nota,
      juego: this.juego,
      juez: this.juez
    };
    this.registroCriterios.push(registroCriterio);

    const indiceSiguiente = this.criterios.indexOf(this.criterioActual) + 1;
    if (indiceSiguiente < this.criterios.length) {
      this.criterioActual = this.criterios[indiceSiguiente];
      this.nota = 0;
    } if (indiceSiguiente == this.criterios.length) {
      this.registrarEvaluacion();
    }else {
      // Se ha completado el wizard, puedes hacer lo que necesites con los criterios registrados
      console.log(this.registroCriterios);
    }
  }

  registrarEvaluacion() {
    for (const criterio of this.registroCriterios) {
      console.log(criterio);
      this.authService.registrarEvaluacion(criterio).subscribe(
        () => {
          // Éxito al registrar la evaluación
          console.log('Evaluación registrada correctamente');
        },
        (error) => {
          // Error al registrar la evaluación
          console.error('Error al registrar la evaluación:', error);
        }
      );
    }
  }

  retrocederCriterio(): void {
    const indiceAnterior = this.criterios.indexOf(this.criterioActual) - 1;
    if (indiceAnterior >= 0) {
      this.criterioActual = this.criterios[indiceAnterior];
      this.nota = 0;
    }
    this.registroCriterios.pop();
  }
}
