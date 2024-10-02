import { Grupo } from "./grupo";

export class Meta {
  id?: number;
  tipo: string;
  valorObjetivo: number;
  valorAtual: number;
  grupo: Grupo;
  categoria: string;

  constructor(
    tipo: string,
    valorObjetivo: number,
    valorAtual: number,
    grupo: Grupo,
    categoria: string,
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
