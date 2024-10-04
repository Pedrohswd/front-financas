import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../services/meta.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta } from '../../models/meta';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Grupo } from '../../models/grupo';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css'],
  imports: [
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    ToastModule
  ],
  standalone: true,
})
export class MetaComponent implements OnInit {
  metas: Meta[] = [];
  metaForm: FormGroup;
  editingMeta: Meta | null = null;

  constructor(
    private metaService: MetaService,
    private fb: FormBuilder,
    private messageService: MessageService // Injetando o MessageService
  ) {
    this.metaForm = this.fb.group({
      id: [null],
      descricao: ['', Validators.required],
      valorObjetivo: [0, [Validators.required, Validators.min(0)]],
      valorAtual: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadMetas();
  }

  loadMetas(): void {
    this.metaService.readAll().subscribe(
      (metas) => {
        this.metas = metas;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar metas.' });
      }
    );
  }

  addMeta(): void {
    if (this.metaForm.valid) {
      this.metaService.create(this.metaForm.value).subscribe(
        () => {
          this.loadMetas(); // Atualiza a lista após adicionar
          this.resetForm(); // Reseta o formulário
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Meta adicionada com sucesso.' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao adicionar meta.' });
        }
      );
    }
  }

  editMeta(meta: Meta): void {
    this.editingMeta = { ...meta };
    this.metaForm.patchValue(meta);
  }

  updateMeta(): void {
    if (this.editingMeta && this.metaForm.valid) {
      const id = this.editingMeta.id;
      if (id !== undefined) {
        this.metaService.update(this.metaForm.value).subscribe(
          () => {
            this.loadMetas(); // Atualiza a lista após a edição
            this.resetForm(); // Reseta o formulário
            this.editingMeta = null; // Reseta o estado de edição
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Meta atualizada com sucesso.' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar meta.' });
          }
        );
      } else {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'ID da meta não definido.' });
      }
    }
  }

  deleteMeta(id: number): void {
    this.metaService.delete(id).subscribe(
      () => {
        this.loadMetas(); // Atualiza a lista após a exclusão
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Meta excluída com sucesso.' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir meta.' });
      }
    );
  }

  resetForm(): void {
    this.metaForm.reset();
    this.editingMeta = null;
  }
}