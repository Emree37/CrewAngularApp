import { Component } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSelectModule, CommonModule, MatToolbarModule, FormsModule, MatOptionModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  selectedLanguage = 'English';
  languages = [
    { value: 'English', label: 'English' },
    { value: 'French', label: 'Français' },
    { value: 'Portuguese', label: 'Português' }
  ];

  constructor(private languageService: LanguageService) {}

  changeLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }
}
