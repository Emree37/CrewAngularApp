import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';



import { CertificateService } from '../services/certificate/certificate.service';
import { CertificateTypeService } from '../services/certificate-type/certificate-type.service';
import { CrewCertificateService } from '../services/crew-certificate/crew-certificate.service';

import { CertificateModel } from '../models/certificate-model';
import { CrewCertificateViewModel } from '../models/view-models/crew-certificates-view-model';

import { ConfirmDeleteComponent } from '../common-components/confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-crew-certificates',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, MatSelectModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './crew-certificates.component.html',
  styleUrl: './crew-certificates.component.css'
})
export class CrewCertificatesComponent implements OnInit {
  @Input() crewId!: number;
  certificates: CrewCertificateViewModel[] = [];
  showCertificateForm = false;
  selectedCertificateId: number | null = null;
  issueDate: string = '';
  expiryDate: string = '';
  availableCertificates: CertificateModel[] = [];

  displayedColumns: string[] = ['name', 'typeName', 'typeDescription', 'issueDate', 'expiryDate', 'remove'];

  constructor(
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService,
    private crewCertificateService: CrewCertificateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.crewId) {
      //Available Certificates
      this.availableCertificates = this.certificateService.getCertificates();

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

  toggleCertificateForm(): void {
    this.showCertificateForm = !this.showCertificateForm;
  }

  addCertificate(): void {
    if (!this.selectedCertificateId || !this.issueDate || !this.expiryDate) {
      alert("Please fill all fields before adding a certificate.");
      return;
    }

    const selectedCertificate = this.availableCertificates.find(cert => cert.id === this.selectedCertificateId);
    if (!selectedCertificate) return;

    this.crewCertificateService.addCrewCertificate({
      crewId: this.crewId,
      certificateId: this.selectedCertificateId,
      issueDate: this.issueDate,
      expiryDate: this.expiryDate
    });

    this.selectedCertificateId = null;
    this.issueDate = '';
    this.expiryDate = '';
    this.showCertificateForm = false;

    this.ngOnInit();
  }
}
