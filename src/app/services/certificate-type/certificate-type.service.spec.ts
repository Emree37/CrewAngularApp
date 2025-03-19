import { TestBed } from '@angular/core/testing';

import { CertificateTypeService } from './certificate-type.service';

describe('CertificateTypeService', () => {
  let service: CertificateTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
