import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { CrewService } from '../../services/crew/crew.service';

import { CrewModel } from '../../models/crew-model';

@Component({
  selector: 'app-edit-crew-modal',
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './edit-crew-modal.component.html',
  styleUrl: './edit-crew-modal.component.css'
})
export class EditCrewModalComponent {
  crew: CrewModel;

  nationalities: string[] = ['English', 'French', 'Portuguese'];
  titles: string[] = ['Captain', 'Cooker', 'Engineer', 'Mechanicer'];

  constructor(
    public dialogRef: MatDialogRef<EditCrewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { crew: CrewModel },
    private crewService: CrewService
  ) {
    this.crew = { ...data.crew };
  }

  save(): void {
    this.updateTotalIncome();
    this.crewService.updateCrew(this.crew);
    this.dialogRef.close({ success: true });
  }

  updateTotalIncome(): void {
    this.crew.totalIncome = this.crew.daysOnBoard * this.crew.dailyRate;
  }

  close(): void {
    this.dialogRef.close();
  }
}
