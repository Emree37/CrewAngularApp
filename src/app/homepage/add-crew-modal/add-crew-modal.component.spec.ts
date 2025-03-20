import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrewModalComponent } from './add-crew-modal.component';

describe('AddCrewModalComponent', () => {
  let component: AddCrewModalComponent;
  let fixture: ComponentFixture<AddCrewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCrewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
