import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meta } from '../models/meta';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private apiUrl = 'http://localhost:8080/api/metas'; // Ajuste conforme necessário

  constructor(private http: HttpClient) { }

  create(meta: Meta): Observable<Meta> {
    return this.http.post<Meta>(this.apiUrl, meta);
  }

  readAll(): Observable<Meta[]> {
    return this.http.get<Meta[]>(this.apiUrl);
  }

  update(id: number, updatedMeta: Meta): Observable<Meta> {
    return this.http.put<Meta>(`${this.apiUrl}/${id}`, updatedMeta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
