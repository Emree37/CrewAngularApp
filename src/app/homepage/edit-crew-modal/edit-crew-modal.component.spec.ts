import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrewModalComponent } from './edit-crew-modal.component';

describe('EditCrewModalComponent', () => {
  let component: EditCrewModalComponent;
  let fixture: ComponentFixture<EditCrewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCrewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCrewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
