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
  selectedDate: String = "";
  ngOnInit(): void {
    this.authService.getEvents().subscribe(
      data => {
        this.events = data; // Asigna los datos recibidos a la propiedad 'events'
      },
      error => {
        console.log(error);
      }
    );
    
  }

  getSelectedEvent(): any {
    return this.events.find(event => event.fechaInicio === this.selectedDate);
  }
}
