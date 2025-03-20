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
      nationality: 'Bosnian',
      title: 'Forward',
      daysOnBoard: 120,
      dailyRate: 200,
      currency: 'USD',
      totalIncome: 24000,
      certificateIds: [1, 2]
    },
    {
      id: 2,
      firstName: 'Yusuf',
      lastName: 'En-Nesyri',
      nationality: 'Moroccan',
      title: 'Striker',
      daysOnBoard: 150,
      dailyRate: 180,
      currency: 'EUR',
      totalIncome: 27000,
      certificateIds: [1]
    },
    {
      id: 3,
      firstName: 'Dusan',
      lastName: 'Tadic',
      nationality: 'Serbian',
      title: 'Winger',
      daysOnBoard: 110,
      dailyRate: 190,
      currency: 'USD',
      totalIncome: 20900,
      certificateIds: []
    },
    {
      id: 4,
      firstName: 'Anderson',
      lastName: 'Talisca',
      nationality: 'Brazilian',
      title: 'Midfielder',
      daysOnBoard: 130,
      dailyRate: 210,
      currency: 'USD',
      totalIncome: 27300,
      certificateIds: [1, 2]
    },
    {
      id: 5,
      firstName: 'Milan',
      lastName: 'Skriniar',
      nationality: 'Slovakian',
      title: 'Defender',
      daysOnBoard: 140,
      dailyRate: 220,
      currency: 'EUR',
      totalIncome: 30800,
      certificateIds: [2]
    }
  ];

  constructor() { }

  getCrews(): CrewModel[] {
    return this.crewList;
  }

  getCrewCertificateIds(crewId: number): number[] {
    const crew = this.crewList.find(c => c.id === crewId);
    return crew ? crew.certificateIds : [];
  }
  
}

