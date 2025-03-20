import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { CertificateService } from '../services/certificate/certificate.service';
import { CertificateTypeService } from '../services/certificate-type/certificate-type.service';
import { CrewCertificateService } from '../services/crew-certificate/crew-certificate.service';

import { CrewCertificateViewModel  } from '../models/view-models/crew-certificates-view-model';


@Component({
  selector: 'app-crew-certificates',
  imports: [MatTableModule, CommonModule],
  templateUrl: './crew-certificates.component.html',
  styleUrl: './crew-certificates.component.css'
})
export class CrewCertificatesComponent implements OnInit {
  @Input() crewId!: number;
  certificates: CrewCertificateViewModel[] = [];

  displayedColumns: string[] = ['name', 'typeName', 'typeDescription', 'issueDate', 'expiryDate'];

  constructor(
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService,
    private crewCertificateService: CrewCertificateService
  ) { }

  ngOnInit(): void {
    if (this.crewId) {
      // Crew Certificates
      const crewCertificates = this.crewCertificateService.getCrewCertificates(this.crewId);

      if (crewCertificates.length === 0) {
        this.certificates = [];
        return;
      }

      // All Certificates
      const certificateIds = crewCertificates.map(cert => cert.certificateId);
      const certificates = this.certificateService.getCertificatesByIds(certificateIds);

      // All Certificate Types
      const allCertificateTypes = this.certificateTypeService.getCertificateTypes();

      this.certificates = crewCertificates.map(crewCert => {
        const certificate = certificates.find(cert => cert.id === crewCert.certificateId);
        const type = certificate ? allCertificateTypes.find(t => t.id === certificate.certificateTypeId) : undefined;

        return {
          id: certificate?.id || 0,
          name: certificate?.name || 'Unknown',
          issueDate: crewCert.issueDate,
          expiryDate: crewCert.expiryDate,
          typeName: type ? type.name : 'Unknown',
          typeDescription: type ? type.description : 'No Description'
        } as CrewCertificateViewModel;
      });
    }
  }

}
