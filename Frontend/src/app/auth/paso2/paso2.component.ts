import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../../services/register-service.service'
import { UserI } from '../../models/user';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.css']
})
export class Paso2Component implements OnInit {
  registroForm = this.registroService.registroForm;

  constructor(private router: Router,  private registroService: RegistroService) { }

  ngOnInit(): void {
  }

  // Lógica adicional para el paso 1

  navegarSiguiente(): void {
    /*if (this.paso2Form.valid) {
      this.router.navigate(['/auth/registro/paso3']);
    }*/
    const registroData: UserI = this.registroService.getRegistroData();
    console.log(registroData);
    this.router.navigateByUrl('/auth/registro/paso3');
  }
  
  navegarAnterior(): void {
    this.router.navigate(['/auth/registro/paso1']);
  }

}