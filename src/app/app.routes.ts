import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { PessoaComponent } from './components/pessoa/pessoa/pessoa.component';
import { MetaComponent } from './components/meta/meta.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'pessoas', component: PessoaComponent},
  {path: 'meta', component: MetaComponent},
];
