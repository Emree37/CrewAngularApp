import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewCertificatesComponent } from './crew-certificates.component';

describe('CrewCertificatesComponent', () => {
  let component: CrewCertificatesComponent;
  let fixture: ComponentFixture<CrewCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewCertificatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
