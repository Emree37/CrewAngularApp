import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CertificateService } from '../services/certificate/certificate.service';
import { CertificateTypeService } from '../services/certificate-type/certificate-type.service';

import { CertificateViewModel } from '../models/view-models/certificate-view-model';

import { AddCertificateModalComponent } from './add-certificate-modal/add-certificate-modal.component';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-certificates',
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent implements OnInit {
  certificates: CertificateViewModel[] = [];
  displayedColumns: string[] = ['name', 'typeName', 'typeDescription'];

  constructor(
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    const certificates = this.certificateService.getCertificates();
    const certificateTypes = this.certificateTypeService.getCertificateTypes();

    this.certificates = certificates.map(cert => {
      const type = certificateTypes.find(t => t.id === cert.certificateTypeId);
      return {
        id: cert.id,
        name: cert.name,
        typeName: type ? type.name : 'Unknown',
        typeDescription: type ? type.description : 'No Description'
      } as CertificateViewModel;
    });
  }

  navigateToHomepage(): void {
    this.router.navigate(['/']);
  }

  addCertificate(): void {
    const dialogRef = this.dialog.open(AddCertificateModalComponent, {
      width: '400px',
      data: { certificateTypes: this.certificateTypeService.getCertificateTypes() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newId = this.certificateService.getNextCertificateId();
        this.certificateService.addCertificate({
          id: newId,
          name: result.name,
          certificateTypeId: result.certificateTypeId
        });
        this.loadCertificates();
      }
    });
  }
}
