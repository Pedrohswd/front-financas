import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css']
})
export class MetaComponent implements OnInit {
  metaForm: FormGroup;
  tipos: any[];
  categorias: any[];
  grupos: Grupo[];

  constructor(
    private formBuilder: FormBuilder,
    private metaService: MetaService,
    private grupoService: GrupoService,
    private messageService: MessageService
  ) { 
    this.metaForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      valorObjetivo: ['', [Validators.required, Validators.min(0)]],
      valorAtual: ['', [Validators.required, Validators.min(0)]],
      grupo: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEnums();
    this.loadGrupos();
  }

  loadEnums(): void {
    this.tipos = Object.keys(Tipo).map(key => ({ label: key, value: Tipo[key] }));
    this.categorias = Object.keys(Categoria).map(key => ({ label: key, value: Categoria[key] }));
  }

  loadGrupos(): void {
    this.grupoService.getGrupos().subscribe(
      grupos => this.grupos = grupos,
      error => this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao carregar grupos'})
    );
  }

  onSubmit(): void {
    if (this.metaForm.valid) {
      const meta = this.metaForm.value;
      this.metaService.createMeta(meta).subscribe(
        response => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Meta criada com sucesso!'});
          this.metaForm.reset();
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao criar meta'});
        }
      );
    } else {
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Por favor, preencha todos os campos corretamente.'});
    }
  }
}