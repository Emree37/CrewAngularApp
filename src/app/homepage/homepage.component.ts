import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CrewModel } from '../models/crew-model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homepage',
  imports: [MatTableModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  crewList: CrewModel[] = [];
  displayedColumns: string[] = ['actions', 'firstName', 'lastName', 'nationality', 'title', 'daysOnBoard', 'dailyRate', 'totalIncome'];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getCrewList();
  }

  getCrewList(): void {
    this.crewList = this.dataService.getCrews();
  }

  goToCrewCardPage(crewId: number): void {
    alert(crewId);
  }

  openEditPopup(crew: CrewModel): void {
    alert(crew.id);
  }

  deleteCrew(crewId: number): void {
    this.crewList = this.crewList.filter(crew => crew.id !== crewId);
  }
}
