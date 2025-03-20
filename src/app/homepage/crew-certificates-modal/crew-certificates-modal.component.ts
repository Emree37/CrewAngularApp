import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CrewCertificatesComponent } from '../../crew-certificates/crew-certificates.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-crew-certificates-modal',
  imports: [CommonModule, CrewCertificatesComponent, MatButtonModule, MatDialogModule],
  templateUrl: './crew-certificates-modal.component.html',
  styleUrl: './crew-certificates-modal.component.css'
})
export class CrewCertificatesModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CrewCertificatesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { crewId: number }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
