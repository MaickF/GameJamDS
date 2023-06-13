import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserI } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      contrasenha: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      telefono: ['', Validators.required],
      universidad: ['', Validators.required],
      especialidad: ['', Validators.required],
      condicionMedica: ['', Validators.required],
      necesidadDietetica: ['', Validators.required],
      codigoDePais: ['', Validators.required],
      rol: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required]
    });
  }

  // Método para obtener los valores del formulario
  getRegistroData(): UserI {
    return this.registroForm.value as UserI;
  }

  getRegistroForm(): FormGroup {
    return this.registroForm;
  }
}
