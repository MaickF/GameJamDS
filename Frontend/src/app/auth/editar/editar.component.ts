import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


interface User {
  nombre: String,
  contrasenha: String,
  apellido1: String,
  apellido2: String,
  correoElectronico: String,
  telefono: String,
  universidad: String,
  especialidad: String,
  condicionMedica: String,
  necesidadDietetica: String,
  codigoDePais: String,
  rol: String,
  pais: String,
  ciudad: String
}
interface Juego {
  nombre: string;
  descripcion: string;
  categoria: string;
  plataforma: string;
  rating: string;
  evento: {
    fecha: string;
    lugar: string
  }
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  seleccion: string = ''; // Variable para almacenar la opción seleccionada
  email: string = '';

  @ViewChild('usuarioContainer', { static: false }) usuarioContainer!: ElementRef;
  @ViewChild('usuarioEditContainer', { static: false }) usuarioEditContainer!: ElementRef;
  @ViewChild('juegoContainer', { static: false }) juegoContainer!: ElementRef;


  ngAfterViewInit() {
    this.ocultarContenedores();
  }

  constructor(private http: HttpClient, private router: Router) {
    this.rol = localStorage.getItem('rolActual') as string;
  }

  mostrarContenedor() {
    if (this.seleccion === 'usuario') {
      this.mostrarUsuarioContainer();
      this.ocultarJuegoContainer();
      this.ocultarUsuarioEditContainer();
    } else if (this.seleccion === 'juego') {
      this.ocultarUsuarioContainer();
      this.mostrarJuegoContainer();
    } else {
      this.ocultarContenedores();
    }
  }

  private mostrarUsuarioContainer() {
    const usuarioContainer = this.usuarioContainer.nativeElement as HTMLElement;
    usuarioContainer.style.display = 'block';
  }

  private ocultarUsuarioContainer() {
    const usuarioContainer = this.usuarioContainer.nativeElement as HTMLElement;
    usuarioContainer.style.display = 'none';
  }

  private mostrarJuegoContainer() {
    const juegoContainer = this.juegoContainer.nativeElement as HTMLElement;
    juegoContainer.style.display = 'block';
  }

  private ocultarJuegoContainer() {
    const juegoContainer = this.juegoContainer.nativeElement as HTMLElement;
    juegoContainer.style.display = 'none';
  }

  private ocultarContenedores() {
    this.ocultarUsuarioContainer();
    this.ocultarJuegoContainer();
  }

  // Usuario edit

  universidad: string = "";
  rol: string = "";
  codigoPais: string = "";
  usuarioEncontrado: boolean = false;
  rolSeleccionado: string = 'participante';

  verificarUsuario() {
    this.http.post<User>('http://localhost:5000/getUserByEmail', { email: this.email })
      .subscribe((response) => {

        console.log(response);
        if (response !== null) {
          this.usuarioEncontrado = true;
          this.mostrarCajas();
          this.rolSeleccionado = response.rol as string;
          console.log(this.rolSeleccionado);

        }
      }, (error) => {
        console.error(error);
        this.usuarioEncontrado = false;
        this.mostrarCajas();
      });
    console.log("usuarioEncontrado: " + this.usuarioEncontrado);
  }


  mostrarCajas() {
    if (this.usuarioEncontrado) {
      this.mostrarUsuarioEditContainer();
    } else {
      this.ocultarUsuarioEditContainer();
    }
  }

  private mostrarUsuarioEditContainer() {
    const usuarioEditContainer = this.usuarioEditContainer.nativeElement as HTMLElement;
    usuarioEditContainer.style.display = 'block';
  }

  private ocultarUsuarioEditContainer() {
    const usuarioEditContainer = this.usuarioEditContainer.nativeElement as HTMLElement;
    usuarioEditContainer.style.display = 'none';
  }

  aplicarCambioDeRol() {
    this.http.post('http://localhost:5000/updateUserRole', {
      correoElectronico: this.email,
      nuevoRol: this.rolSeleccionado
    }).subscribe(
      (response) => {
        console.log("Se cambio el rol");
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // Juego edit
  juego: String = '';
  errorFlag: boolean = false;
  errorMessage: string = '';

  verificarJuego() {
    console.log("Verificando juego");
    this.http.post<Juego>('http://localhost:5000/searchExactGame', { nombre: this.juego }).subscribe(
      (response) => {
        localStorage.setItem("juego", JSON.stringify(response));
        this.router.navigateByUrl('/auth/juego');
      },
      (error) => {
        this.errorFlag = true;
        this.errorMessage = "No existe el juego " + this.juego;
        console.log(this.errorMessage);
      }
    );
  }
}
