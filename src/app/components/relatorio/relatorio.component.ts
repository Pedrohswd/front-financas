import { Component } from '@angular/core';
import { Grupo } from '../../models/grupo';
import { LancamentoService } from '../../services/lancamento.service';
import { GrupoService } from '../../services/grupo.service';
import { Lancamento } from '../../models/lancamento';
import { MessageService } from 'primeng/api'; // Importando o MessageService
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast'; // Importando o ToastModule

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [
    DropdownModule,
    TableModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
    CommonModule,
    ToastModule // Adicionando o ToastModule
  ],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent {
  lancamentos: Lancamento[] = [];
  filteredLancamentos: Lancamento[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
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
  groupedLancamentos: { [key: string]: Lancamento[] } = {};
  selectedTipo: string | null = null;
  selectedGrupo: Grupo | null = null;
  meta: number = 0; // Propriedade para armazenar a meta

  constructor(
    private lancamentoService: LancamentoService,
    private grupoService: GrupoService,
    private messageService: MessageService // Injetando o MessageService
  ) {}

  ngOnInit(): void {
    this.loadLancamentos();
    this.loadGrupos();
  }

  loadLancamentos(): void {
    this.lancamentoService.readAll().subscribe(
      (lancamentos) => {
        this.lancamentos = lancamentos;
        this.filteredLancamentos = lancamentos;
        this.sortLancamentos();
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

  filterLancamentos(): void {
    this.filteredLancamentos = this.lancamentos.filter((lancamento) => {
      const lancamentoData = new Date(lancamento.data);
      return (
        (!this.selectedCategoria || lancamento.categoria === this.selectedCategoria) &&
        (!this.selectedTipo || lancamento.tipo === this.selectedTipo) &&
        (!this.selectedGrupo || lancamento.grupo.id === this.selectedGrupo.id) &&
        (!this.startDate || lancamentoData >= this.startDate) &&
        (!this.endDate || lancamentoData <= this.endDate)
      );
    });
    this.sortLancamentos(); // Chama o método para ordenar após o filtro
  }

  sortLancamentos(): void {
    this.filteredLancamentos.sort((a, b) => {
      if (a.tipo < b.tipo) {
        return -1; // Ordena em ordem ascendente
      }
      if (a.tipo > b.tipo) {
        return 1; // Ordena em ordem ascendente
      }
      return 0; // Mantém a ordem se forem iguais
    });
  }

  calcularSomatorioPorCategoria(): { [key: string]: number } {
    return this.filteredLancamentos.reduce((acc, lancamento) => {
      if (!acc[lancamento.categoria]) {
        acc[lancamento.categoria] = 0; // Inicializa a categoria se não existir
      }
      acc[lancamento.categoria] += lancamento.valor; // Soma o valor do lançamento à categoria
      return acc;
    }, {} as { [key: string]: number }); // Tipo do acumulador
  }
}