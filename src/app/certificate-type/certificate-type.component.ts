import { Component, OnInit } from '@angular/core';
import { CertificateTypeService } from '../services/certificate-type/certificate-type.service';
import { CertificateTypeModel } from '../models/certificate-type-model';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddCertificateTypeModalComponent } from './add-certificate-type-modal/add-certificate-type-modal.component';

@Component({
  selector: 'app-certificate-type',
  imports: [MatTableModule, MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './certificate-type.component.html',
  styleUrl: './certificate-type.component.css'
})
export class CertificateTypeComponent implements OnInit {
  certificateTypes: CertificateTypeModel[] = [];
  displayedColumns: string[] = ['name', 'description'];

  constructor(private certificateTypeService: CertificateTypeService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCertificateTypes();
  }

  loadCertificateTypes(): void {
    this.certificateTypes = this.certificateTypeService.getCertificateTypes();
  }

  navigateToHomepage(): void {
    this.router.navigate(['/']);
  }

  openAddCertificateTypeModal(): void {
    const dialogRef = this.dialog.open(AddCertificateTypeModalComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.certificateTypeService.addCertificateType(result);
        this.loadCertificateTypes();
      }
    });
  }
}
