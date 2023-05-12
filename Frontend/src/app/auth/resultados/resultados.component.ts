import { Component, OnInit, Injectable  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared.service';

interface Juego {
  nombre: string;
  categoria: string;
}

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})

export class ResultadosComponent implements OnInit{

  title = "Resultados";
  juegos: Juego[] = [];
  
  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) {
    console.log("Entro router "  + this.router.url)
  }

  ngOnInit() {
    this.juegos = this.sharedService.juegos;
    console.log("\n\nforsando \nrecibio a \n" + JSON.stringify(this.juegos) + "\n" +JSON.stringify(this.sharedService.juegos));
  }
}
