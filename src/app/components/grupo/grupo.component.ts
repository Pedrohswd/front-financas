import { PessoaService } from './../../services/pessoa.service';
import { MetaService } from './../../services/meta.service';
import { Component } from '@angular/core';
import { Grupo } from '../../models/grupo';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GrupoService } from '../../services/grupo.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Meta } from '../../models/meta';
import { DropdownModule } from 'primeng/dropdown';
import { Pessoa } from '../../models/pessoa';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {
  grupos: Grupo[] = [];
  grupoForm: FormGroup;
  editingGrupo: Grupo | null = null; // Para edição
  metas: Meta[] = []; // Lista de meta
  pessoas: Pessoa[] = []; // Lista de metas

  constructor(private grupoService: GrupoService, private metaService: MetaService,private fb: FormBuilder,
    private pessoaService: PessoaService
  ) {
    this.grupoForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      descricao: [''],
      isSaldoNegativo: [false],
      pessoa: [null, Validators.required], // Inicializa como um array vazio
      meta: [null, Validators.required] // Inicializa como um array vazio
    });
  }

  ngOnInit(): void {
    this.loadGrupos();
    this.loadMetas();
    this.loadPessoas();
  }

  loadMetas() {
    this.metaService.readAll().subscribe(metas => {
      this.metas = metas;
    });
  }

  loadGrupos(): void {
    this.grupoService.readAll().subscribe(grupos => {
      this.grupos = grupos;
    });
  }

  loadPessoas(): void {
    this.pessoaService.getPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
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
