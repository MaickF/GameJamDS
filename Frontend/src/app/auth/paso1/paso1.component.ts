import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from '../../services/register-service.service'
import { UserI } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css']
})
export class Paso1Component implements OnInit {
  registroForm = this.registroService.registroForm;
  existencia = false;
  enBlanco: boolean = false;

  constructor(private authService: AuthService, private router: Router, private registroService: RegistroService) { }

  ngOnInit(): void {
  }

  // Lógica adicional para el paso 1

  navegarSiguiente(): void {
    console.log("entro");
    const value: UserI = this.registroService.getRegistroData();
    // Verificar si hay algún espacio vacío en el formulario
    const nombreControl = this.registroForm.get('nombre');
    const nombre: boolean = nombreControl?.value === '';
    const apellido1Control = this.registroForm.get('apellido1');
    const apellido1: boolean = apellido1Control?.value === '';
    const apellido2Control = this.registroForm.get('apellido2');
    const apellido2: boolean = apellido2Control?.value === '';
    const correoControl = this.registroForm.get('correoElectronico');
    const correo: boolean = correoControl?.value === '';
    const contraControl = this.registroForm.get('contrasenha');
    const contra: boolean = contraControl?.value === '';
    console.log(nombre);
    this.enBlanco = nombre || apellido1 || apellido2 && correo || contra;
    this.existencia = false;
    if (!this.enBlanco) {
      this.enBlanco = false;
      this.authService.userValidate(value).subscribe((result: boolean) => {
        console.log(result);
        if (result) {
          this.router.navigateByUrl('/auth/registro/paso2');
        } else {
          this.existencia = true;
          // El JSON está vacío
        }
      });
    }
  }

}