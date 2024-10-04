import { Grupo } from "./grupo";

export class Meta {
  id?: number;
  descricao: string;
  valorObjetivo: number;
  valorAtual: number;
  grupo: Grupo;

  constructor(
    descricao: string,
    valorObjetivo: number,
    valorAtual: number,
    grupo: Grupo,
    id?: number
  ) {
    this.id = id;
    this.descricao = descricao;
    this.valorObjetivo = valorObjetivo;
    this.valorAtual = valorAtual;
    this.grupo = grupo;
  }
}
