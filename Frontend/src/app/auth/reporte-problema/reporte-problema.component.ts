import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReportI } from '../../models/report';

@Component({
  selector: 'app-reporte-problema',
  templateUrl: './reporte-problema.component.html',
  styleUrls: ['./reporte-problema.component.css']
})
export class ReporteProblemaComponent {
  categoriaSeleccionada: string | undefined;
  descripcion: string = '';
  sinMarcar =  false;
  constructor(private authService: AuthService, private router: Router) { }
  categorias: any[] = [
    { nombre: 'Errores y bloqueos', seleccionado: false },
    { nombre: 'Problemas de compatibilidad', seleccionado: false },
    { nombre: 'Problemas de conexion', seleccionado: false },
    { nombre: 'Problemas de audio y video', seleccionado: false },
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
      this.authService.problemReport(reporte);
      this.sinMarcar=false;
      window.confirm("Se ha registrado tu reporte")
      this.router.navigateByUrl('/auth/juego');
    }else{
      this.sinMarcar=true;
    }
  }
}
