import { Injectable } from '@angular/core';
import { CertificateModel } from '../../models/certificate-model';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private certificates: CertificateModel[] = [
    { id: 1, name: 'Certificate 1', certificateTypeId: 1 },
    { id: 2, name: 'Certificate 2', certificateTypeId: 2 }
  ];

  constructor() { }

  getCertificates(): CertificateModel[] {
    return this.certificates;
  }
  
  getCertificatesByIds(certificateIds: number[]): CertificateModel[] {
    return this.certificates.filter(cert => certificateIds.includes(cert.id));
  }

}
