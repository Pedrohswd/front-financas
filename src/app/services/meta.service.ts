import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private apiUrl = 'http://localhost:8080/api/metas'; // Ajuste conforme necessário

  constructor(private http: HttpClient) { }

  getMetas(): Observable<Meta[]> {
    return this.http.get<Meta[]>(this.apiUrl);
  }

  getMeta(id: number): Observable<Meta> {
    return this.http.get<Meta>(`${this.apiUrl}/${id}`);
  }

  createMeta(meta: Meta): Observable<Meta> {
    return this.http.post<Meta>(this.apiUrl, meta);
  }

  updateMeta(id: number, meta: Meta): Observable<Meta> {
    return this.http.put<Meta>(`${this.apiUrl}/${id}`, meta);
  }

  deleteMeta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
