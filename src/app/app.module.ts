import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServerProvider } from './services/server.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { StateProvider } from './services/state.service';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SpacesListComponent } from './components/spaces-list/spaces-list.component';
import { SpaceComponent } from './pages/space/space.component';
import { ScheduleSpaceModalComponent } from './components/schedule-space-modal/schedule-space-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastProvider } from './services/toast.service';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SpaceFormModalComponent } from './components/space-form-modal/space-form-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    HomeComponent,
    SpacesListComponent,
    SpaceComponent,
    ScheduleSpaceModalComponent,
    ReservationsComponent,
    DashboardComponent,
    SpaceFormModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatTableModule
  ],
  providers: [
    provideAnimationsAsync(),
    StateProvider,
    ServerProvider,
    ToastProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
