export class Pessoa {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;

  constructor(
    nome: string = '',
    cpf: string = '',
    email: string = '',
    telefone: string = '',
    id?: number
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.telefone = telefone;
  }
}
