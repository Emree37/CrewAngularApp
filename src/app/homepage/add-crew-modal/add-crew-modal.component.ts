import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CrewModel } from '../../models/crew-model';
import { CrewService } from '../../services/crew/crew.service';
import { CertificateService } from '../../services/certificate/certificate.service';
import { CertificateModel } from '../../models/certificate-model';
import { CrewCertificateService } from '../../services/crew-certificate/crew-certificate.service';


@Component({
  selector: 'app-add-crew-modal',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-crew-modal.component.html',
  styleUrl: './add-crew-modal.component.css'
})
export class AddCrewModalComponent implements OnInit {
  crew = {
    firstName: '',
    lastName: '',
    nationality: '',
    title: '',
    daysOnBoard: null,
    dailyRate: null,
    currency: ''
  };

  titleList = ['Captain', 'Engineer', 'Cooker', 'Mechanicer'];
  nationalityList = ['Turkish', 'French', 'English', 'Portuguese'];
  currencyList = ['USD', 'EUR'];

  showCertificateForm = false;
  selectedCertificateId: number | null = null;
  issueDate: string = ''; 
  expiryDate: string = '';
  availableCertificates: CertificateModel[] = [];
  crewCertificates: { certificateId: number, certificateName: string, issueDate: string, expiryDate: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCrewModalComponent>,
    private crewService: CrewService,
    private certificateService: CertificateService,
    private crewCertificateService: CrewCertificateService
  ) { }

  ngOnInit(): void {
    this.availableCertificates = this.certificateService.getCertificates();
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const newCrewId = this.crewService.getNextCrewId();

    const newCrew: CrewModel = {
      id: newCrewId,
      firstName: this.crew.firstName,
      lastName: this.crew.lastName,
      nationality: this.crew.nationality,
      title: this.crew.title,
      daysOnBoard: this.crew.daysOnBoard!,
      dailyRate: this.crew.dailyRate!,
      currency: this.crew.currency,
      totalIncome: this.crew.daysOnBoard! * this.crew.dailyRate!,
      isDeleted: false
    };

    this.crewService.addCrew(newCrew);

    if (this.crewCertificates.length > 0) {
      this.crewCertificates.forEach(cert => {
        this.crewCertificateService.addCrewCertificate({
          crewId: newCrewId,
          certificateId: cert.certificateId,
          issueDate: cert.issueDate,
          expiryDate: cert.expiryDate
        });
      });
    }

    this.dialogRef.close({ success: true });
  }

  isFormInvalid(): boolean {
    return !this.crew.firstName || !this.crew.lastName || !this.crew.nationality ||
      !this.crew.title || !this.crew.daysOnBoard || !this.crew.dailyRate || !this.crew.currency;
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
  
    this.crewCertificates = [
      ...this.crewCertificates,
      {
        certificateId: this.selectedCertificateId,
        certificateName: selectedCertificate.name,
        issueDate: this.issueDate,  
        expiryDate: this.expiryDate 
      }
    ];
  
    this.selectedCertificateId = null;
    this.issueDate = '';
    this.expiryDate = '';
    this.showCertificateForm = false;
  }

  getCertificateName(id: number): string {
    const cert = this.availableCertificates.find(c => c.id === id);
    return cert ? cert.name : 'Unknown';
  }
}
