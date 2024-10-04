import { Component } from '@angular/core';
import { Grupo } from '../../models/grupo';
import { LancamentoService } from '../../services/lancamento.service';
import { GrupoService } from '../../services/grupo.service';
import { Lancamento } from '../../models/lancamento';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [
    DropdownModule,
    TableModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css',
})
export class RelatorioComponent {
  lancamentos: Lancamento[] = [];
  filteredLancamentos: Lancamento[] = [];
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
  tipos = ['DESPESA', 'RECEITA'];
  grupos: Grupo[] = [];
  selectedCategoria: string | null = null;
  selectedTipo: string | null = null;
  selectedGrupo: Grupo | null = null;
  meta: number = 0; // Propriedade para armazenar a meta

  constructor(
    private lancamentoService: LancamentoService,
    private grupoService: GrupoService
  ) {}

  ngOnInit(): void {
    this.loadLancamentos();
    this.loadGrupos();
  }

  loadLancamentos(): void {
    this.lancamentoService.readAll().subscribe((lancamentos) => {
      this.lancamentos = lancamentos;
      this.filteredLancamentos = lancamentos; // Inicializa a listagem filtrada
    });
  }

  loadGrupos(): void {
    this.grupoService.readAll().subscribe((grupos) => {
      this.grupos = grupos;
    });
  }

  filterLancamentos(): void {
    this.filteredLancamentos = this.lancamentos.filter(lancamento => {
      return (!this.selectedCategoria || lancamento.categoria === this.selectedCategoria) &&
             (!this.selectedTipo || lancamento.tipo === this.selectedTipo) &&
             (!this.selectedGrupo || lancamento.grupo.id === this.selectedGrupo.id);
    });
  }

  // Função para calcular o somatório dos lançamentos filtrados
  calcularSomatorio(): number {
    return this.filteredLancamentos.reduce((total, lancamento) => total + lancamento.valor, 0);
  }
}
