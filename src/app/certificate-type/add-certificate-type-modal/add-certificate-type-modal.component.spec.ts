import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificateTypeModalComponent } from './add-certificate-type-modal.component';

describe('AddCertificateTypeModalComponent', () => {
  let component: AddCertificateTypeModalComponent;
  let fixture: ComponentFixture<AddCertificateTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCertificateTypeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCertificateTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
