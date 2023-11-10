import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  
  constructor(
    private http: HttpClient
  ) { }

  buscarTodo(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${environment.host}/personas/listar`);
  }
  
  crear(persona: Persona): Observable<void> {
    return this.http.post<void>(`${environment.host}/personas/insertar`, persona);
  }

  editar(persona: Persona): Observable<void> {
    return this.http.put<void>(`${environment.host}/personas/modificar`, persona)
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.host}/personas/eliminar/${id}`);
  }

  buscarPorIdentificacion(identificacion: string): Observable<Persona[]>{
    return this.http.get<Persona[]>(`${environment.host}/personas/buscar-por-identificacion/${identificacion}`);
  }
}
