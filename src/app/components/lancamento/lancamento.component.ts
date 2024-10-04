import { Component } from '@angular/core';
import { Lancamento } from '../../models/lancamento';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LancamentoService } from '../../services/lancamento.service';
import { GrupoService } from '../../services/grupo.service';
import { Grupo } from '../../models/grupo';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamento',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    ToastModule
  ],
  templateUrl: './lancamento.component.html',
  styleUrl: './lancamento.component.css',
})
export class LancamentoComponent {
  lancamentos: Lancamento[] = [];
  lancamentoForm: FormGroup;
  editingLancamento: Lancamento | null = null; // Para edição
  grupos: Grupo[] = []; // Para selecionar o grupo
  categorias = [
    'ALIMENTACAO',
    'EDUCACAO',
    'TRANSPORTE',
    'SAUDE',
    'LAZER',
    'MORADIA',
    'VESTUARIO',
    'OUTROS'
  ];
  tipos = [
    'DESPESA',
    'RECEITA'
  ]; 

  constructor(
    private lancamentoService: LancamentoService,
    private grupoService: GrupoService,
    private fb: FormBuilder,
    private messageService: MessageService // Injetando o MessageService
  ) {
    this.lancamentoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      data: [new Date(), Validators.required],
      tipo: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      grupo: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLancamentos();
    this.loadGrupos();
  }

  loadLancamentos(): void {
    this.lancamentoService.readAll().subscribe(
      (lancamentos) => {
        this.lancamentos = lancamentos;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar lançamentos.' });
      }
    );
  }

  loadGrupos(): void {
    this.grupoService.readAll().subscribe(
      (grupos) => {
        this.grupos = grupos;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar grupos.' });
      }
    );
  }

  addLancamento(): void {
    if (this.lancamentoForm.valid) {
      this.lancamentoService.create(this.lancamentoForm.value).subscribe(
        () => {
          this.resetForm();
          this.loadLancamentos(); // Atualiza a lista após adicionar
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento adicionado com sucesso.' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao adicionar lançamento.' });
        }
      );
    }
  }

  editLancamento(lancamento: Lancamento): void {
    this.editingLancamento = { ...lancamento };
    this.lancamentoForm.patchValue(lancamento);
  }

  updateLancamento(): void {
    if (this.editingLancamento && this.lancamentoForm.valid) {
      const id = this.editingLancamento.id;
      if (id !== undefined) {
        this.lancamentoService.update(id, this.lancamentoForm.value).subscribe(
          () => {
            this.resetForm();
            this.loadLancamentos(); // Atualiza a lista após a edição
            this.editingLancamento = null; // Reseta o estado de edição
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento atualizado com sucesso.' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar lançamento.' });
          }
        );
      } else {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'ID do lançamento não definido.' });
      }
    }
  }

  deleteLancamento(id: number): void {
    this.lancamentoService.delete(id).subscribe(
      () => {
        this.loadLancamentos(); // Atualiza a lista após a exclusão
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento excluído com sucesso.' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir lançamento.' });
      }
    );
  }

  resetForm(): void {
    this.lancamentoForm.reset();
    this.editingLancamento = null;
  }
}
