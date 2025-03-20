import { Component, OnInit } from '@angular/core';
import { CertificateTypeService } from '../services/certificate-type/certificate-type.service';
import { CertificateTypeModel } from '../models/certificate-type-model';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-certificate-type',
  imports: [MatTableModule, MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './certificate-type.component.html',
  styleUrl: './certificate-type.component.css'
})
export class CertificateTypeComponent implements OnInit {
  certificateTypes: CertificateTypeModel[] = [];
  displayedColumns: string[] = ['name', 'description'];

  constructor(private certificateTypeService: CertificateTypeService, private router: Router) { }

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
    alert("Add Certificate Type modal açılacak!");
  }
}
