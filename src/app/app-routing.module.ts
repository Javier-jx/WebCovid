import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { SintomasComponent } from './sintomas/sintomas.component';

const routes: Routes = [
  { path: '',
redirectTo: '/home',
pathMatch: 'full',
},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
   { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
   { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)},
   { path: 'operaciones', component: OperacionesComponent},
   { path: 'sintomas', component: SintomasComponent},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
