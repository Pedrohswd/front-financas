import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputOtpModule } from 'primeng/inputotp';
import { PessoaService } from '../../../services/pessoa.service';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { Pessoa } from '../../../models/pessoa';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [ButtonModule, InputTextModule, InputMaskModule, ReactiveFormsModule, ToastModule,TableModule],
  templateUrl: './pessoa.component.html',
  styleUrl: './pessoa.component.css'
})
export class PessoaComponent implements OnInit {
  pessoaForm: FormGroup;
  pessoas: Pessoa[] = []; // Lista de pessoas
  editingPessoa: boolean = false;

  constructor(private fb: FormBuilder, private pessoaService: PessoaService) {
    this.pessoaForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadPessoas(); // Carrega as pessoas ao inicializar
  }

  loadPessoas() {
    this.pessoaService.getPessoas().subscribe((pessoas: Pessoa[]) => {
      this.pessoas = pessoas;
    });
  }

  addPessoa() {
    if (this.pessoaForm.valid) {
      this.pessoaService.createPessoa(this.pessoaForm.value).subscribe(() => {
        this.loadPessoas(); // Atualiza a lista após adicionar
        this.pessoaForm.reset(); // Reseta o formulário
      });
    }
  }

  editPessoa(pessoa: Pessoa) {
    this.editingPessoa = true;
    this.pessoaForm.patchValue(pessoa); // Preenche o formulário com os dados da pessoa
  }

  updatePessoa() {
    const id = this.pessoaForm.value.id;
    if (this.pessoaForm.valid) {
      this.pessoaService.updatePessoa(id,this.pessoaForm.value).subscribe(() => {
        this.loadPessoas(); // Atualiza a lista após a edição
        this.pessoaForm.reset(); // Reseta o formulário
        this.editingPessoa = false; // Reseta o estado de edição
      });
    }
  }

  deletePessoa(id: number) {
    this.pessoaService.deletePessoa(id).subscribe(() => {
      this.loadPessoas(); // Atualiza a lista após a exclusão
    });
  }
}
