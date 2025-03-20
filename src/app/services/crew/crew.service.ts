import { Injectable } from '@angular/core';
import { CrewModel } from '../../models/crew-model';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  private crewList: CrewModel[] = [
    {
      id: 1,
      firstName: 'Edin',
      lastName: 'Dzeko',
      nationality: 'Turkish',
      title: 'Captain',
      daysOnBoard: 120,
      dailyRate: 200,
      currency: 'USD',
      totalIncome: 24000,
      certificateIds: [1, 2],
      isDeleted: false
    },
    {
      id: 2,
      firstName: 'Yusuf',
      lastName: 'En-Nesyri',
      nationality: 'French',
      title: 'Cooker',
      daysOnBoard: 150,
      dailyRate: 180,
      currency: 'EUR',
      totalIncome: 27000,
      certificateIds: [1],
      isDeleted: false
    },
    {
      id: 3,
      firstName: 'Dusan',
      lastName: 'Tadic',
      nationality: 'English',
      title: 'Engineer',
      daysOnBoard: 110,
      dailyRate: 190,
      currency: 'USD',
      totalIncome: 20900,
      certificateIds: [],
      isDeleted: false
    },
    {
      id: 4,
      firstName: 'Anderson',
      lastName: 'Talisca',
      nationality: 'Portuguese',
      title: 'Engineer',
      daysOnBoard: 130,
      dailyRate: 210,
      currency: 'USD',
      totalIncome: 27300,
      certificateIds: [1, 2],
      isDeleted: false
    },
    {
      id: 5,
      firstName: 'Milan',
      lastName: 'Skriniar',
      nationality: 'Turkish',
      title: 'Captain',
      daysOnBoard: 140,
      dailyRate: 220,
      currency: 'EUR',
      totalIncome: 30800,
      certificateIds: [2],
      isDeleted: false
    }
  ];

  constructor() { }

  getCrews(): CrewModel[] {
    return this.crewList.filter(crew => !crew.isDeleted);
  }

  getCrewCertificateIds(crewId: number): number[] {
    const crew = this.crewList.find(c => c.id === crewId);
    return crew ? crew.certificateIds : [];
  }

  softDeleteCrew(crewId: number): void {
    const crew = this.crewList.find(c => c.id === crewId);
    if (crew) {
      crew.isDeleted = true;
    }
  }

}

