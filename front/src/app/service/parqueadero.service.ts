import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parqueadero } from '../model/parqueadero';
import { ParqueaderoPersona } from '../model/parqueadero-persona';

@Injectable({
  providedIn: 'root'
})
export class ParqueaderoService {

  constructor(
    private http: HttpClient
  ) { }

  buscarTodo(): Observable<Parqueadero[]> {
    return this.http.get<Parqueadero[]>(`${environment.host}/parqueadero/listar`);
  }

  crear(parqueadero: Parqueadero): Observable<void> {
    return this.http.post<void>(`${environment.host}/parqueadero/insertar`, parqueadero);
  }

  editar(parqueadero: Parqueadero): Observable<void> {
    return this.http.put<void>(`${environment.host}/parqueadero/modificar`, parqueadero)
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.host}/parqueadero/eliminar/${id}`);
  }

  listarPorEstado(): Observable<Parqueadero[]> {
    return this.http.get<Parqueadero[]>(`${environment.host}/parqueadero/listar-por-estado`);
  }

  listarParqueaderoConPersona(): Observable<ParqueaderoPersona[]> {
    return this.http.get<ParqueaderoPersona[]>(`${environment.host}/parqueadero/listar-parqueadero-persona`);
  }

  desocuparParqueadero(id: number): Observable<void> {
    return this.http.put<void>(`${environment.host}/parqueadero/desocupar`, id);
  }

  asignarParqueadero(pp: ParqueaderoPersona): Observable<string> {
    return this.http.post<string>(`${environment.host}/parqueadero/asignar`, pp);
  }
}
