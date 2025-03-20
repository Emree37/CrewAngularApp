import { Component, OnInit } from '@angular/core';
import { CrewModel } from '../models/crew-model';
import { CrewService } from '../services/crew/crew.service';
import { MatDialog } from '@angular/material/dialog';
import { CrewCertificatesModalComponent } from './crew-certificates-modal/crew-certificates-modal.component';
import { ConfirmDeleteComponent } from '../common-components/confirm-delete/confirm-delete.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Router
import { Router } from '@angular/router';

//Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-homepage',
  imports: [MatTableModule, MatButtonModule, MatMenuModule, MatIconModule, CommonModule, MatCardModule, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  providers: [MatDialog],
})
export class HomepageComponent implements OnInit {
  crewList: CrewModel[] = [];
  displayedColumns: string[] = ['actionMenu', 'firstName', 'lastName', 'nationality', 'title', 'daysOnBoard', 'dailyRate', 'discount', 'totalIncome', 'certificates'];
  totalIncomeUSD: number = 0;
  totalIncomeEUR: number = 0;
  discountValues: { [key: number]: number } = {};

  constructor(private crewService: CrewService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCrewData();
  }

  loadCrewData(): void {
    this.crewList = this.crewService.getCrews();
    this.updateTotalIncomeSummary();
  }

  goToCrewCard(id: number) {
    this.router.navigate([`/crewcard/${id}`]);
  }

  openEditPopup(crew: CrewModel) {
    console.log(`Edit Popup Açılacak:`, crew);
  }

  openDeleteCrewDialog(crew: CrewModel) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: {
        title: 'Delete Crew',
        message: `Are you sure you want to delete ${crew.firstName} ${crew.lastName}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crewService.softDeleteCrew(crew.id);
        this.crewList = this.crewService.getCrews();
      }
    });
  }

  openCertificatesModal(crew: CrewModel) {
    this.dialog.open(CrewCertificatesModalComponent, {
      maxWidth: '90vw',
      maxHeight: '80vh',
      data: { crewId: crew.id }
    });
  }

  updateTotalIncomeSummary(): void {
    this.totalIncomeUSD = this.crewList
      .filter(crew => crew.currency === 'USD' && !crew.isDeleted)
      .reduce((total, crew) => total + crew.totalIncome, 0);

    this.totalIncomeEUR = this.crewList
      .filter(crew => crew.currency === 'EUR' && !crew.isDeleted)
      .reduce((total, crew) => total + crew.totalIncome, 0);
  }

  updateTotalIncome(discountPercentage: number | null, crew: CrewModel): void {
    this.discountValues[crew.id] = discountPercentage ?? 0;
  
    const originalTotalIncome = crew.daysOnBoard * crew.dailyRate;
  
    
    if (discountPercentage == null || isNaN(discountPercentage)) {
      crew.totalIncome = originalTotalIncome;
    } 
    else {
      const validDiscount = Math.max(0, Math.min(100, discountPercentage));
      crew.totalIncome = Math.round(originalTotalIncome * (1 - validDiscount / 100));
    }
  
    this.updateTotalIncomeSummary();
  }

  navigateToCertificateType(): void {
    this.router.navigate(['/certificate-type']);
  }
}
