import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { scheduleRequest } from '../../types/space';
import { ServerProvider } from '../../services/server.service';
import { ToastProvider } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-space-modal',
  templateUrl: './schedule-space-modal.component.html',
  styleUrl: './schedule-space-modal.component.css'
})
export class ScheduleSpaceModalComponent {
  name: string = '';
  selectedStartTime: string | null = null;
  selectedEndTime: string | null = null;
  availableTimes: any = [];
  filteredEndTimes: any = [];
  day: string = '';

  constructor(
    private router: Router,
    private toast: ToastProvider, 
    private server: ServerProvider,
    public dialogRef: MatDialogRef<ScheduleSpaceModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.availableTimes = data.availableTimes;
    this.day = data.day;
    }

  onStartTimeChange(startTime: string): void {
    this.filteredEndTimes = this.getContinuousEndTimes(startTime);
  }

  getContinuousEndTimes(startTime: string): { start: string, end: string }[] {
    const startIndex = this.availableTimes.findIndex((time: any) => time.start === startTime);
    if (startIndex === -1) return [];

    const continuousTimes: { start: string, end: string }[] = [];
    for (let i = startIndex; i < this.availableTimes.length - 1; i++) {
      if (this.availableTimes[i + 1].start === this.availableTimes[i].end) {
        continuousTimes.push(this.availableTimes[i + 1]);
      } else {
        break;
      }
    }
    return continuousTimes;
  }

  async submitReservation() {
    const reservationData: scheduleRequest = {
      space_id: this.data.spaceId,
      event_name: this.name,
      start_date: this.day + " " + this.selectedStartTime,
      end_date: this.day + " " + this.selectedEndTime
    };
    
    try{
      await this.server.scheduleSpace(reservationData);
      this.toast.showSuccess('Reserva creada');
      this.dialogRef.close();
      this.router.navigate(['/home']);
    }
    catch(error){
      this.toast.showError('Error al reservar el espacio');
    }
    
  }

  close(): void {
    this.dialogRef.close();
  }
}
