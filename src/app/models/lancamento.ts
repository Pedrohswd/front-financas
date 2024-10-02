import { Grupo } from './grupo';

export interface Lancamento {
  id?: number;
  nome: string;
  descricao?: string;
  data: Date;
  tipo: string;
  valor: number;
  categoria: string;
  grupo: Grupo;
}
