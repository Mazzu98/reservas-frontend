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
import { SpaceComponent } from './pages/space/space.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoUserGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NoUserGuard]},
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [ClientGuard] },
      { path: 'reservations', component: ReservationsComponent, canActivate: [ClientGuard] },
      { path: 'space/:id', component: SpaceComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] }
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
