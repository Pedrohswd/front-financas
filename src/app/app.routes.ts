import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { PessoaComponent } from './components/pessoa/pessoa/pessoa.component';
import { MetaComponent } from './components/meta/meta.component';
import { GrupoComponent } from './components/grupo/grupo.component';
import { LancamentoComponent } from './components/lancamento/lancamento.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';

export const routes: Routes = [
  {path: '', redirectTo: '/pessoas', pathMatch: 'full'},
  {path: 'pessoas', component: PessoaComponent},
  {path: 'meta', component: MetaComponent},
  {path: 'grupo', component: GrupoComponent},
  {path: 'lancamento', component: LancamentoComponent},
  {path: 'relatorio', component: RelatorioComponent},
];
