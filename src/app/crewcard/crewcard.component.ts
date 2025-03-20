import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrewService } from '../services/crew/crew.service';
import { CrewModel } from '../models/crew-model';
import { CommonModule } from '@angular/common';

//For RouterLink
import { RouterModule } from '@angular/router';

// Material Components
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CrewCertificatesComponent } from '../crew-certificates/crew-certificates.component';

@Component({
  selector: 'app-crewcard',
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    CrewCertificatesComponent
  ],
  templateUrl: './crewcard.component.html',
  styleUrl: './crewcard.component.css'
})
export class CrewcardComponent implements OnInit {
  crew!: CrewModel;

  constructor(private route: ActivatedRoute, private crewService: CrewService) { }

  ngOnInit(): void {
    const crewId = Number(this.route.snapshot.paramMap.get('id'));
    this.crew = this.crewService.getCrews().find(c => c.id === crewId)!;
  }
}
