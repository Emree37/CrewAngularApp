import { Component, OnInit } from '@angular/core';
import { CrewModel } from '../models/crew-model';
import { CrewService } from '../services/crew/crew.service';
import { MatDialog } from '@angular/material/dialog';
import { CrewCertificatesModalComponent } from './crew-certificates-modal/crew-certificates-modal.component';

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

  deleteCrew(id: number) {
    //this.crewList = this.crewList.filter(crew => crew.id !== id);
    console.log(`Crew Silindi: ${id}`);
  }

  openCertificatesModal(crew: CrewModel) {
    this.dialog.open(CrewCertificatesModalComponent, {
      maxWidth: '90vw',
      maxHeight: '80vh',
      data: { crewId: crew.id }
    });
  }

}
