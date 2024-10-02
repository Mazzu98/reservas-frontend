import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ServerProvider } from '../../services/server.service';
import { ScheduleSpaceModalComponent } from '../../components/schedule-space-modal/schedule-space-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
  spaceId: number = 0;
  day: string = '';
  spaceDetails: any = null;
  loading: boolean = true;
  errorMessage: string = '';
  dateControl = new FormControl();
  availableTimes: any[] = [];
  groupedAvailableTimes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private server: ServerProvider,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spaceId = +this.route.snapshot.paramMap.get('id')!;
    this.day = history.state.date;
    this.fetchSpaceDetails(this.spaceId);

    this.dateControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(date => {
          this.day = date;
          this.fetchAvailableDates();
      });

    this.dateControl.setValue(this.day);  
  }

  async fetchSpaceDetails(id: number): Promise<void> {
    try {
      this.spaceDetails = await this.server.getSpace(id);
    } catch (error) {
      this.errorMessage = 'Error al cargar los detalles del espacio';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  async fetchAvailableDates(): Promise<void> {
    try {
      const availableTimes = await this.server.getSpaceAvailability(this.spaceId, this.day);
      this.availableTimes = availableTimes;
      this.groupedAvailableTimes = this.groupAvailableIntervals(this.availableTimes);
    } catch (error) {
      this.errorMessage = 'Error al cargar las fechas disponibles';
      console.error(error);
    }
  }

  filteredEndTimes: { start: string, end: string }[] = [];
  selectedStartTime: string | null = null;

  groupAvailableIntervals(availableTimes: {start: string, end: string}[]) {
    const groupedIntervals: any[] = [];
    let currentGroup: any[] = [];

    availableTimes.forEach((time, index) => {
      if (currentGroup.length === 0) {
        currentGroup.push(time);
      } else {
        const lastInGroup = currentGroup[currentGroup.length - 1];
        if (lastInGroup.end === time.start) {
          currentGroup.push(time);
        } else {
          groupedIntervals.push({ start: currentGroup[0].start, end: currentGroup[currentGroup.length - 1].end });
          currentGroup = [time];
        }
      }

      if (index === availableTimes.length - 1 && currentGroup.length > 0) {
        groupedIntervals.push({ start: currentGroup[0].start, end: currentGroup[currentGroup.length - 1].end });
      }
    });

    return groupedIntervals;
  }

  openModal(): void {
    this.dialog.open(ScheduleSpaceModalComponent, {
      width: '350px',
      height: '400px',
      data: {
        spaceId: this.spaceId,
        availableTimes: this.availableTimes,
        day: this.dateControl.value,
        onSuccess: () => {
          this.router.navigate(['/home']);
        }
      }
    });
  }
}
