import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { CertificateService } from '../services/certificate/certificate.service';
import { CertificateTypeService } from '../services/certificate-type/certificate-type.service';
import { CrewCertificateService } from '../services/crew-certificate/crew-certificate.service';

import { CrewCertificateViewModel } from '../models/view-models/crew-certificates-view-model';

import { ConfirmDeleteComponent } from '../common-components/confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-crew-certificates',
  imports: [MatTableModule, CommonModule, MatIconModule],
  templateUrl: './crew-certificates.component.html',
  styleUrl: './crew-certificates.component.css'
})
export class CrewCertificatesComponent implements OnInit {
  @Input() crewId!: number;
  certificates: CrewCertificateViewModel[] = [];

  displayedColumns: string[] = ['name', 'typeName', 'typeDescription', 'issueDate', 'expiryDate', 'remove'];

  constructor(
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService,
    private crewCertificateService: CrewCertificateService,
    private dialog: MatDialog
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

  openDeleteCertificateDialog(cert: CrewCertificateViewModel): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: {
        title: 'Remove Certificate',
        message: `Are you sure you want to remove the certificate "${cert.name}"?`,
        confirmText: 'Remove',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crewCertificateService.removeCrewCertificate(this.crewId, cert.id);
        this.ngOnInit();
      }
    });
  }
}
