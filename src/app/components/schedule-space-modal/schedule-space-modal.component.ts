import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServerProvider } from '../../services/server.service';
import { ToastProvider } from '../../services/toast.service';
import { Router } from '@angular/router';
import { scheduleRequest } from '../../types/reservation';

@Component({
  selector: 'app-schedule-space-modal',
  templateUrl: './schedule-space-modal.component.html',
  styleUrl: './schedule-space-modal.component.css'
})
export class ScheduleSpaceModalComponent {
  editMode: boolean = false;
  name: string = '';
  selectedStartTime: string | null = null;
  selectedEndTime: string | null = null;
  availableTimes: any = [];
  filteredEndTimes: any = [];
  day: string = '';
  onSuccess: () => void;

  constructor(
    private router: Router,
    private toast: ToastProvider, 
    private server: ServerProvider,
    public dialogRef: MatDialogRef<ScheduleSpaceModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data.reservationEdit){
        this.editMode = true;
        this.name = data.reservationEdit.event_name;
        this.day = data.reservationEdit.start_date.split(' ')[0];
        this.selectedStartTime = data.reservationEdit.start_date.split(' ')[1];
        this.selectedEndTime = data.reservationEdit.end_date.split(' ')[1];

        this.server.getSpaceAvailability(this.data.reservationEdit.space_id, this.day, data.reservationEdit.id)
          .then((availableTimes) => {
            this.availableTimes = availableTimes;
          })
      }
      else{
        this.availableTimes = data.availableTimes;
        this.day = data.day;
      }

      this.onSuccess = data.onSuccess;
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
      if(this.editMode){
        await this.server.editReservations(this.data.reservationEdit.id, reservationData);
        this.toast.showSuccess('Reserva editada');
      }
      else {
        await this.server.scheduleSpace(reservationData);
        this.toast.showSuccess('Reserva creada');
      }

      this.onSuccess && this.onSuccess();

      this.dialogRef.close();
    }
    catch(error){
      this.toast.showError('Error al reservar el espacio');
    }
    
  }

  close(): void {
    this.dialogRef.close();
  }
}
