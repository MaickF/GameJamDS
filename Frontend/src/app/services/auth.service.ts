import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserI } from '../models/user';
import { ReportI } from '../models/report';
import { JwtResponseI } from '../models/jwt-response';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://140.84.168.62:5000';
  authSubject = new BehaviorSubject(false);
  private token: string = '';
  constructor(private httpClient: HttpClient) { }

  register(user: UserI): void {
    this.httpClient.post<any>(`${this.AUTH_SERVER}/register`, user).subscribe(
      (res: any) => {
        console.log(res); // Aquí puedes trabajar con la respuesta
      },
      (error) => {
        console.error(error); // Manejo de errores
      }
    );
  }

  gameReport(report: ReportI): void {
    this.httpClient.post<any>(`${this.AUTH_SERVER}/reportGame`, report).subscribe(
      (res: any) => {
        console.log(res); // Aquí puedes trabajar con la respuesta
      },
      (error) => {
        console.error(error); // Manejo de errores
      }
    );
  }

  userValidate(user: UserI): Observable<boolean> {
    console.log(user);
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/userValidate`, user).pipe(
      tap((res) => console.log(res)), // Imprimir el resultado en la consola
      map((res) => {
        if (res) {
          // Verificar si los atributos están vacíos
          const areAttributesEmpty = !res.dataUser || !res.dataUser.noExiste;
  
          return !areAttributesEmpty; // Retorna true si los atributos no están vacíos
        }
  
        return false; // Retorna false si la respuesta es falsy
      })
    );
  }

  login(user:UserI): Observable<JwtResponseI>{
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
    user).pipe(tap(
      (res:JwtResponseI)=>{
        if(res){
          //guardar token
          console.log(res);
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn)
        }
      }
    ));
  }

  logout(): void{
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  getEvents(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/events`);
  }

  getCriterios(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/criterios`);
  }

  registrarEvaluacion(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/criterios`);
  }

  getGame(game:string): Observable<any> {
    const params = new HttpParams().set('juego', game);
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/getGame`,  { params });
  }

  private saveToken(token: string, expiresIn: string):void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN") || '';
    }
    return this.token;
  }
  
}
