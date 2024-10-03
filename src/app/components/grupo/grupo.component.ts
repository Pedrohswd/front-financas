import { Component } from '@angular/core';
import { Grupo } from '../../models/grupo';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GrupoService } from '../../services/grupo.service';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {
  grupos: Grupo[] = [];
  grupoForm: FormGroup;
  editingGrupo: Grupo | null = null; // Para edição

  constructor(private grupoService: GrupoService, private fb: FormBuilder) {
    this.grupoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      isSaldoNegativo: [false],
      pessoas: [[]], // Inicializa como um array vazio
      metas: [[]] // Inicializa como um array vazio
    });
  }

  ngOnInit(): void {
    this.loadGrupos();
  }

  loadGrupos(): void {
    this.grupoService.readAll().subscribe(grupos => {
      this.grupos = grupos;
    });
  }

  addGrupo(): void {
    if (this.grupoForm.valid) {
      this.grupoService.create(this.grupoForm.value).subscribe(() => {
        this.resetForm();
        this.loadGrupos();
      });
    }
  }

  editGrupo(grupo: Grupo): void {
    this.editingGrupo = { ...grupo };
    this.grupoForm.patchValue(grupo);
  }

  updateGrupo(): void {
    if (this.editingGrupo && this.grupoForm.valid) {
      const id = this.editingGrupo.id;
      if (id !== undefined) {
        this.grupoService.update(this.grupoForm.value).subscribe(() => {
          this.resetForm();
          this.loadGrupos();
          this.editingGrupo = null;
        });
      } else {
        console.error('ID do grupo não definido.');
      }
    }
  }

  deleteGrupo(id: number): void {
    this.grupoService.delete(id).subscribe(() => {
      this.loadGrupos();
    });
  }

  resetForm(): void {
    this.grupoForm.reset();
    this.editingGrupo = null;
  }
}
