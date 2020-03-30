import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { ProcureSearchComponent } from './search/procure-search/procure-search.component';
import { RegisterSearchComponent } from './search/register-search/register-search.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'search', component: SearchComponent,
    children: [
       {path: 'proSearch', component: ProcureSearchComponent, pathMatch: 'full'},
       {path: 'regSearch', component: RegisterSearchComponent, pathMatch: 'full'}
      ]},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
