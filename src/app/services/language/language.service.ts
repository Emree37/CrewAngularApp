import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('English');
  currentLanguage = this.languageSubject.asObservable();

  setLanguage(language: string): void {
    this.languageSubject.next(language);
  }
}
