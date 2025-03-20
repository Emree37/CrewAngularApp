import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-certificate-modal',
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatDialogModule],
  templateUrl: './add-certificate-modal.component.html',
  styleUrl: './add-certificate-modal.component.css'
})
export class AddCertificateModalComponent {
  certificate = {
    name: '',
    certificateTypeId: null
  };

  constructor(
    public dialogRef: MatDialogRef<AddCertificateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.certificate);
  }
}
