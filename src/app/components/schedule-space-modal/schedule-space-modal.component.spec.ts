import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSpaceModalComponent } from './schedule-space-modal.component';

describe('ScheduleSpaceModalComponent', () => {
  let component: ScheduleSpaceModalComponent;
  let fixture: ComponentFixture<ScheduleSpaceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleSpaceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleSpaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
