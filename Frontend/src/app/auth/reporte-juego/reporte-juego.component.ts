import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReportI } from '../../models/report';

@Component({
  selector: 'app-reporte-juego',
  templateUrl: './reporte-juego.component.html',
  styleUrls: ['./reporte-juego.component.css']
})
export class ReporteJuegoComponent {
  categoriaSeleccionada: string | undefined;
  descripcion: string = '';
  sinMarcar =  false;
  constructor(private authService: AuthService, private router: Router) { }
  categorias: any[] = [
    { nombre: 'Contenido inapropiado', seleccionado: false },
    { nombre: 'Comportamiento antideportivo', seleccionado: false },
    { nombre: 'Problemas técnicos', seleccionado: false },
    { nombre: 'incumplimiento reglas', seleccionado: false },
    { nombre: 'publicidad engañosa', seleccionado: false },
    { nombre: 'otros', seleccionado: false },
  ];

  ngOnInit(): void {
  }

  actualizarSeleccion(categoriaSeleccionada: any) {
    this.categorias.forEach(categoria => {
      if (categoria !== categoriaSeleccionada) {
        categoria.seleccionado = false;
      }
    });
  }

  obtenerDescripcion() {
    console.log(this.descripcion);
  }

  obtenerValoresSeleccionados(): string {
    const categoriaSeleccionada = this.categorias.find(categoria => categoria.seleccionado);
    if (categoriaSeleccionada) {
      return categoriaSeleccionada.nombre;
    } else {
      return '';
    }
  }


  enviarReporte(): void {
    console.log("entro1");
    console.log(this.obtenerValoresSeleccionados());
    console.log(this.descripcion);
    let categoria = this.obtenerValoresSeleccionados();
    if (!(categoria==='')) {
      console.log("entro2");
      const reporte: ReportI = {
        descripcion: this.descripcion,
        tipo: categoria,
        juego: "juegoGenerico"
      };
      this.authService.gameReport(reporte);
      this.sinMarcar=false;
    }else{
      this.sinMarcar=true;
    }
  }
}
