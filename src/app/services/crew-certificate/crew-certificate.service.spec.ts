import { TestBed } from '@angular/core/testing';

import { CrewCertificateService } from './crew-certificate.service';

describe('CrewCertificateService', () => {
  let service: CrewCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrewCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
