import { Component, OnInit } from '@angular/core';
import { CrewModel } from '../models/crew-model';
import { CrewService } from '../services/crew/crew.service';
import { MatDialog } from '@angular/material/dialog';
import { CrewCertificatesModalComponent } from './crew-certificates-modal/crew-certificates-modal.component';
import { ConfirmDeleteComponent } from '../common-components/confirm-delete/confirm-delete.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCrewModalComponent } from './add-crew-modal/add-crew-modal.component';
import { EditCrewModalComponent } from './edit-crew-modal/edit-crew-modal.component';
import { LanguageService } from '../services/language/language.service';

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

  columnHeaders: string[] = [];
  columnNames: any = {
    English: ['Action Menu', 'First Name', 'Last Name', 'Nationality', 'Title', 'Days On Board', 'Daily Rate', 'Discount', 'Total Income', 'Certificates'],
    French: ['Menu d\'action', 'Prénom', 'Nom', 'Nationalité', 'Titre', 'Jours à bord', 'Tarif journalier', 'Remise', 'Revenu total', 'Certificats'],
    Portuguese: ['Menu de Ação', 'Nome', 'Sobrenome', 'Nacionalidade', 'Título', 'Dias a Bordo', 'Tarifa Diária', 'Desconto', 'Renda Total', 'Certificados']
  };

  constructor(private crewService: CrewService, private router: Router, private dialog: MatDialog, private languageService: LanguageService) { }


  ngOnInit(): void {
    this.loadCrewData();

    this.languageService.currentLanguage.subscribe(lang => {
      this.updateColumns(lang);
    });
  }

  updateColumns(language: string): void {
    const translatedColumns = this.columnNames[language];

    if (!translatedColumns) {
        return;
    }

    this.displayedColumns = ['actionMenu', 'firstName', 'lastName', 'nationality', 'title', 'daysOnBoard', 'dailyRate', 'discount', 'totalIncome', 'certificates'];

    this.columnHeaders = translatedColumns;
}

  loadCrewData(): void {
    this.crewList = this.crewService.getCrews();
    this.updateTotalIncomeSummary();
  }

  goToCrewCard(id: number) {
    this.router.navigate([`/crewcard/${id}`]);
  }

  openEditCrewModal(crew: CrewModel): void {
    const dialogRef = this.dialog.open(EditCrewModalComponent, {
      width: '500px',
      data: { crew }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.loadCrewData();
      }
    });
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

  navigateToCertificates(): void {
    this.router.navigate(['/certificates']);
  }

  openAddCrewModal(): void {
    const dialogRef = this.dialog.open(AddCrewModalComponent, {
      width: '1000px',
      maxHeight: '90vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCrewData();
      }
    });
  }
}
