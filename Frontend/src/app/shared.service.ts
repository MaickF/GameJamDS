import { Injectable } from '@angular/core';

interface Juego {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string;
}


@Injectable({
  providedIn: 'root'
})


export class SharedService {
  juegos: Juego[] = [];
  constructor() { }
}
