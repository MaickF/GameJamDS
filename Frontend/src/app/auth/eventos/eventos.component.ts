import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';

@Component({
  selector: 'app-vista-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  events: any[] = [];
  ngOnInit(): void {
    this.authService.getEvents().subscribe(
      data => {
        this.events = data; // Asigna los datos recibidos a la propiedad 'users'
      },
      error => {
        console.log(error);
      }
    );

  }
}
