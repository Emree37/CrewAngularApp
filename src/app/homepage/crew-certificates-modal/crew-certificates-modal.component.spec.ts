import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewCertificatesModalComponent } from './crew-certificates-modal.component';

describe('CrewCertificatesModalComponent', () => {
  let component: CrewCertificatesModalComponent;
  let fixture: ComponentFixture<CrewCertificatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewCertificatesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewCertificatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
