import { Component } from '@angular/core';
import { ServerProvider } from '../../services/server.service';
import { ToastProvider } from '../../services/toast.service';
import { Reservation } from '../../types/reservation';
import { ScheduleSpaceModalComponent } from '../../components/schedule-space-modal/schedule-space-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

  reservations: Reservation[] = [];
  displayedColumns: string[] = ['event_name', 'space_name', 'start_date', 'end_date', 'actions'];
  loading = true;

  constructor(private server: ServerProvider, private toast: ToastProvider, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchReservations();
  }

  async fetchReservations() {
    this.loading = true;
    try {
      this.reservations = await this.server.getOwnReservations();
    } 
    catch (error) {
      this.toast.showError('Error al cargar las reservaciones');
    }
    finally {
      this.loading = false;
    }
  }

  editReservation(reservation: Reservation) {
    this.dialog.open(ScheduleSpaceModalComponent, {
      width: '350px',
      height: '400px',
      data: {
        spaceId: reservation.space_id,
        reservationEdit: reservation,
        onSuccess: () => this.fetchReservations()
      }
    });
  }

  async cancelReservation(id: number) {
    try {
      await this.server.cancelReservations(id);
      this.toast.showSuccess('Reserva cancelada');
      this.fetchReservations();
    } 
    catch (error) {
      this.toast.showError('Error al cancelar reserva');
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
