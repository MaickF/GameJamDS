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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerCriterios();
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
      nombre: this.criterioActual.nombre,
      nota: this.nota
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
    const criteriosEvaluados = /* Obtener la lista de criterios evaluados */;
    this.authService.registrarEvaluacion(criteriosEvaluados).subscribe(
      () => {
        // Éxito al registrar la evaluación
        console.log('Evaluación registrada correctamente');
      },
      (error: any) => {
        // Error al registrar la evaluación
        console.error('Error al registrar la evaluación:', error);
      }
    );
  }

  retrocederCriterio(): void {
    const indiceAnterior = this.criterios.indexOf(this.criterioActual) - 1;
    if (indiceAnterior >= 0) {
      this.criterioActual = this.criterios[indiceAnterior];
      this.nota = 0;
    }
  }
}
