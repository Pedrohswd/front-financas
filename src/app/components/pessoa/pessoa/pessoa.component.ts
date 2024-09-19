import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputOtpModule } from 'primeng/inputotp';
import { PessoaService } from '../../../services/pessoa.service';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [ButtonModule, InputTextModule, InputMaskModule, ReactiveFormsModule, ToastModule],
  templateUrl: './pessoa.component.html',
  styleUrl: './pessoa.component.css'
})
export class PessoaComponent implements OnInit {
  pessoaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private messageService: MessageService
  ) { 
    this.pessoaForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefone: ['', [Validators.required, Validators.maxLength(15)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.pessoaForm.valid) {
      const pessoa = this.pessoaForm.value;
      this.pessoaService.createPessoa(pessoa).subscribe(
        response => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Pessoa cadastrada com sucesso!'});
          this.pessoaForm.reset();
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao cadastrar pessoa. Por favor, tente novamente.'});
        }
      );
    } else {
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Por favor, preencha todos os campos corretamente.'});
    }
  }
}
