import { Injectable } from '@angular/core';
import { CrewCertificateModel } from '../../models/crew-certificate-model';

@Injectable({
  providedIn: 'root'
})
export class CrewCertificateService {
  private crewCertificates: CrewCertificateModel[] = [
    { crewId: 1, certificateId: 1, issueDate: '2024-01-10', expiryDate: '2026-01-10' },
    { crewId: 1, certificateId: 2, issueDate: '2023-12-05', expiryDate: '2025-12-05' },
    { crewId: 2, certificateId: 1, issueDate: '2023-11-20', expiryDate: '2025-11-20' },
    { crewId: 4, certificateId: 1, issueDate: '2024-03-23', expiryDate: '2026-02-14' },
    { crewId: 4, certificateId: 2, issueDate: '2023-11-30', expiryDate: '2025-07-04' },
    { crewId: 5, certificateId: 2, issueDate: '2023-08-16', expiryDate: '2025-07-16' }
  ];

  constructor() { }

  getCrewCertificates(crewId: number): CrewCertificateModel[] {
    return this.crewCertificates.filter(c => c.crewId === crewId);
  }

  addCrewCertificate(newCrewCertificate: CrewCertificateModel): void {
    this.crewCertificates.push(newCrewCertificate);
  }

  removeCrewCertificate(crewId: number, certificateId: number): void {
    this.crewCertificates = this.crewCertificates.filter(cert => !(cert.crewId === crewId && cert.certificateId === certificateId));
  }
}
