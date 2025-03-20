import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-certificate-type-modal',
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, FormsModule],
  templateUrl: './add-certificate-type-modal.component.html',
  styleUrl: './add-certificate-type-modal.component.css'
})
export class AddCertificateTypeModalComponent {
  certificateType = {
    name: '',
    description: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddCertificateTypeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.certificateType);
  }
}
