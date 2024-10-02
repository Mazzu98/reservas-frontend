import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ServerProvider } from '../../services/server.service';
import moment from 'moment';
import { Space } from '../../types/space';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spaces-list',
  templateUrl: './spaces-list.component.html',
  styleUrls: ['./spaces-list.component.css']
})
export class SpacesListComponent implements OnInit {
  spaces: Space[] = [];
  filteredSpaces: any[] = [];
  typeControl = new FormControl('');
  capacityControl = new FormControl('');
  dateControl = new FormControl('');
  loading = true;

  constructor(private server: ServerProvider, private router: Router) {}

  ngOnInit(): void {
    this.applyFilters();

    this.typeControl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.applyFilters();
    });

    this.capacityControl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.applyFilters();
    });

    this.dateControl.setValue(moment().format('YYYY-MM-DD'));
    this.dateControl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.applyFilters();
    });
  }

  async applyFilters(): Promise<void> {
    const type = this.typeControl.value || '';
    const capacity = parseInt(this.capacityControl.value || '0') || 0;
    const date = this.dateControl.value || moment().format('YYYY-MM-DD');
    this.loading = true;

    try {
      this.spaces = await this.server.availableSpaces(type, capacity, date);
      this.filteredSpaces = this.spaces.length > 0 ? this.spaces : [];
    } 
    catch (error) {
      this.filteredSpaces = [];
    }
    finally {
      this.loading = false;
    }
  }

  onSpaceSelect(space: Space): void {
    this.router.navigate(['/space', space.id ], { state: { date: this.dateControl.value } });
  }
}
