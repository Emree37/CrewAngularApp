export interface CrewModel {
    id: number;
    firstName: string;
    lastName: string;
    nationality:string;
    title:string;
    daysOnBoard:number;
    dailyRate:number;
    currency:string;
    totalIncome:number;
    certificateIds: number[];
}