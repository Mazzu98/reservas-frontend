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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    HomeComponent,
    SpacesListComponent,
    SpaceComponent,
    ScheduleSpaceModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule
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
