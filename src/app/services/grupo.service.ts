import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from '../models/grupo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private apiUrl = 'http://localhost:8080/api/grupos';

  constructor(private http: HttpClient) { }

  create(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(this.apiUrl, grupo);
  }

  readAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.apiUrl);
  }

  update(id: number, updatedGrupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.apiUrl}/${id}`, updatedGrupo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}