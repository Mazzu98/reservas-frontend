import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { NoUserGuard } from './guards/noUser.guard';
import { ClientGuard } from './guards/client.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoUserGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NoUserGuard]},
  { 
    path: '', 
    component: LayoutComponent, // El layout se muestra siempre que el usuario esté logueado
    children: [
      { path: 'home', component: HomeComponent, canActivate: [ClientGuard] },
      { path: 'dashboard', component: HomeComponent, canActivate: [AdminGuard] },
      // { path: 'profile', component: ProfileComponent } // Agrega otras rutas aquí
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
