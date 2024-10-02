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
  ],
  standalone: true,
})
export class MetaComponent implements OnInit {
  metas: Meta[] = [];
  metaForm: FormGroup;
  editingMeta: Meta | null = null;
  grupos: Grupo[] = [];

  constructor(private metaService: MetaService, private fb: FormBuilder) {
    this.metaForm = this.fb.group({
      tipo: ['', Validators.required],
      valorObjetivo: [0, [Validators.required, Validators.min(0)]],
      valorAtual: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      grupo: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMetas();
  }

  loadMetas(): void {
    this.metaService.readAll().subscribe(metas => {
      this.metas = metas;
    });
  }

  addMeta(): void {
    if (this.metaForm.valid) {
      this.metaService.create(this.metaForm.value).subscribe(() => {
        this.resetForm();
        this.loadMetas();
      });
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
        this.metaService.update(id, this.metaForm.value).subscribe(() => {
          this.resetForm();
          this.loadMetas();
          this.editingMeta = null;
        });
      } else {
        console.error('ID da meta não definido.');
      }
    }
  }

  deleteMeta(id: number): void {
    this.metaService.delete(id).subscribe(() => {
      this.loadMetas();
    });
  }

  resetForm(): void {
    this.metaForm.reset();
    this.editingMeta = null;
  }
}