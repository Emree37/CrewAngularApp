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
      certificateIds: [1, 2]
    }
  ];

  constructor() { }

  getCrews(): CrewModel[] {
    return this.crewList;
  }

}

