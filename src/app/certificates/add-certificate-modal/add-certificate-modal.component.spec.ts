import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificateModalComponent } from './add-certificate-modal.component';

describe('AddCertificateModalComponent', () => {
  let component: AddCertificateModalComponent;
  let fixture: ComponentFixture<AddCertificateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCertificateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCertificateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
