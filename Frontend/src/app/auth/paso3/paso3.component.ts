import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../../services/register-service.service'
import { UserI } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.css']
})
export class Paso3Component implements OnInit {
  registroForm = this.registroService.registroForm;
  existencia = false;
  enBlanco: boolean = false;

  constructor(private authService: AuthService, private router: Router,  private registroService: RegistroService) { }

  ngOnInit(): void {
  }

  // Lógica adicional para el paso 1

  navegarSiguiente(): void {
    console.log("entro1");
    const value: UserI = this.registroService.getRegistroData();
    const form = this.registroService.getRegistroForm();
    console.log(form);
    console.log(value);
    // Verificar si hay algún espacio vacío en el formulario
    const isAnyFieldEmpty = form.valid;
    this.enBlanco = isAnyFieldEmpty;
    this.existencia = false;
    if (!isAnyFieldEmpty) {
      this.enBlanco = false;
      this.authService.register(value);
      this.router.navigateByUrl('/auth');
    }
  }
  
  navegarAnterior(): void {
    this.router.navigate(['/auth/registro/paso2']);
  }

}