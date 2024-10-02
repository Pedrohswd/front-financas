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

@Component({
  selector: 'app-lancamento',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
  ],
  templateUrl: './lancamento.component.html',
  styleUrl: './lancamento.component.css',
})
export class LancamentoComponent {
  lancamentos: Lancamento[] = [];
  lancamentoForm: FormGroup;
  editingLancamento: Lancamento | null = null; // Para edição
  grupos: Grupo[] = []; // Para selecionar o grupo

  constructor(
    private lancamentoService: LancamentoService,
    private grupoService: GrupoService,
    private fb: FormBuilder
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
    this.lancamentoService.readAll().subscribe((lancamentos) => {
      this.lancamentos = lancamentos;
    });
  }

  loadGrupos(): void {
    this.grupoService.readAll().subscribe((grupos) => {
      this.grupos = grupos;
    });
  }

  addLancamento(): void {
    if (this.lancamentoForm.valid) {
      this.lancamentoService.create(this.lancamentoForm.value).subscribe(() => {
        this.resetForm();
        this.loadLancamentos();
      });
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
        this.lancamentoService
          .update(id, this.lancamentoForm.value)
          .subscribe(() => {
            this.resetForm();
            this.loadLancamentos();
            this.editingLancamento = null;
          });
      } else {
        console.error('ID do lançamento não definido.');
      }
    }
  }

  deleteLancamento(id: number): void {
    this.lancamentoService.delete(id).subscribe(() => {
      this.loadLancamentos();
    });
  }

  resetForm(): void {
    this.lancamentoForm.reset();
    this.editingLancamento = null;
  }
}
