import { Injectable } from '@angular/core';
import { CertificateTypeModel } from '../../models/certificate-type-model';

@Injectable({
  providedIn: 'root'
})
export class CertificateTypeService {

  private certificateTypes: CertificateTypeModel[] = [
    { id: 1, name: 'Type A', description: 'Des A' },
    { id: 2, name: 'Type B', description: 'Des B' }
  ];

  constructor() { }

  getCertificateTypes(): CertificateTypeModel[] {
    return this.certificateTypes;
  }

  addCertificateType(newType: CertificateTypeModel): void {
    this.certificateTypes = [...this.certificateTypes, newType];
  }
}
