import { Component, OnInit } from '@angular/core';
import { CrewModel } from '../models/crew-model';
import { CrewService } from '../services/crew/crew.service';
import { MatDialog } from '@angular/material/dialog';
import { CrewCertificatesModalComponent } from './crew-certificates-modal/crew-certificates-modal.component';
import { ConfirmDeleteComponent } from '../common-components/confirm-delete/confirm-delete.component';

//Router
import { Router } from '@angular/router';

//Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homepage',
  imports: [MatTableModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  providers: [MatDialog],
})
export class HomepageComponent implements OnInit {
  crewList: CrewModel[] = [];
  displayedColumns: string[] = ['actionMenu', 'firstName', 'lastName', 'nationality', 'title', 'daysOnBoard', 'dailyRate', 'totalIncome', 'certificates'];

  constructor(private crewService: CrewService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.crewList = this.crewService.getCrews();
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

}
