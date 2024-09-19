import { Tipo } from '../enums/tipo.enum';
import { Categoria } from '../enums/categoria.enum';
import { Grupo } from './grupo.model';

export class Meta {
  id?: number;
  tipo: Tipo;
  valorObjetivo: number;
  valorAtual: number;
  grupo: Grupo;
  categoria: Categoria;

  constructor(
    tipo: Tipo,
    valorObjetivo: number,
    valorAtual: number,
    grupo: Grupo,
    categoria: Categoria,
    id?: number
  ) {
    this.id = id;
    this.tipo = tipo;
    this.valorObjetivo = valorObjetivo;
    this.valorAtual = valorAtual;
    this.grupo = grupo;
    this.categoria = categoria;
  }
}
