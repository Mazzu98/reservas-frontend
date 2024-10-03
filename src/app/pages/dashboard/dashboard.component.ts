import { Component } from '@angular/core';
import { ServerProvider } from '../../services/server.service';
import { ToastProvider } from '../../services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { Space } from '../../types/space';
import { SpaceFormModalComponent } from '../../components/space-form-modal/space-form-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  spaces: Space[] = [];
  displayedColumns: string[] = ['name', 'type', 'description', 'capacity', 'actions'];
  loading = true;

  constructor(private server: ServerProvider, private toast: ToastProvider, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchSpaces();
  }

  async fetchSpaces() {
    this.loading = true;
    try {
      this.spaces = await this.server.getSpaces();
    } 
    catch (error) {
      this.toast.showError('Error al cargar los espacios');
    }
    finally {
      this.loading = false;
    }
  }
  
  openCreateSpaceDialog(): void {
    this.dialog.open(SpaceFormModalComponent, {
      width: '400px',
      data: {
        onSuccess: () => {
          this.toast.showSuccess('Espacio creado');
          this.fetchSpaces()
        },
        onError: () => {
          this.toast.showError('Error al crear espacio');
        }
      } 
    });
  }
  
  editSpace(space: Space): void {
    this.dialog.open(SpaceFormModalComponent, {
      width: '400px',
      data: { 
        space,
        onSuccess: () => {
          this.toast.showSuccess('Espacio Actualizado');
          this.fetchSpaces()
        },
        onError: () => {
          this.toast.showError('Error al actualizar espacio');
        }
      }
    });
  }

  async deleteSpace(id: number) {
    try {
      await this.server.deleteSpace(id);
      this.toast.showSuccess('Espacio eliminado');
      this.fetchSpaces();
    } 
    catch (error) {
      this.toast.showError('Error al eliminar espacio');
    }
  }


  public async getReservations() {
    try {
      const reservations = await this.server.getOwnReservations();
    }
    catch (e) {
      console.log(e);
    }
  }
}
