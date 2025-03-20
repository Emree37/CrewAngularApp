import { Component, Input, OnInit } from '@angular/core';
import { CertificateService } from '../services/certificate/certificate.service';
import { CertificateTypeService } from '../services/certificate-type/certificate-type.service';
import { MatTableModule } from '@angular/material/table';
import { CrewService } from '../services/crew/crew.service';
import { CertificateViewModel } from '../models/view-models/crew-certificates-view-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crew-certificates',
  imports: [MatTableModule, CommonModule],
  templateUrl: './crew-certificates.component.html',
  styleUrl: './crew-certificates.component.css'
})
export class CrewCertificatesComponent implements OnInit {
  @Input() crewId!: number;
  certificates: CertificateViewModel[] = [];

  displayedColumns: string[] = ['name', 'typeName', 'typeDescription', 'issueDate', 'expiryDate'];

  constructor(
    private crewService: CrewService,
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService
  ) { }

  ngOnInit(): void {
    if (this.crewId) {
      const certificateIds = this.crewService.getCrewCertificateIds(this.crewId);
      if (certificateIds.length === 0) {
        this.certificates = [];
        return;
      }
      const crewCertificates = this.certificateService.getCertificatesByIds(certificateIds);
      const allCertificateTypes = this.certificateTypeService.getCertificateTypes();
      this.certificates = crewCertificates.map(cert => {
        const type = allCertificateTypes.find(t => t.id === cert.certificateTypeId);
        return {
          id: cert.id,
          name: cert.name,
          issueDate: cert.issueDate,
          expiryDate: cert.expiryDate,
          typeName: type ? type.name : 'Unknown',
          typeDescription: type ? type.description : 'No Description'
        } as CertificateViewModel;
      });
    }
  }

}
