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

  getNextCertificateId(): number {
    return this.certificates.length > 0 
      ? Math.max(...this.certificates.map(cert => cert.id)) + 1 
      : 1;
  }

  addCertificate(newCertificate: CertificateModel): void {
    this.certificates.push(newCertificate);
  }
}
