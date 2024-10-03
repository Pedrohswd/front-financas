import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../models/lancamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private apiUrl = 'http://localhost:8080/api/lancamentos';

  constructor(private http: HttpClient) { }

  create(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post<Lancamento>(this.apiUrl + '/criar', lancamento);
  }

  readAll(): Observable<Lancamento[]> {
    return this.http.get<Lancamento[]>(this.apiUrl + '/listar');
  }

  update(id: number, updatedLancamento: Lancamento): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${this.apiUrl}/atualizar/${id}`, updatedLancamento);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`);
  }
}
