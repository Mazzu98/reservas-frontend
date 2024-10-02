import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceFormModalComponent } from './space-form-modal.component';

describe('SpaceFormModalComponent', () => {
  let component: SpaceFormModalComponent;
  let fixture: ComponentFixture<SpaceFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
