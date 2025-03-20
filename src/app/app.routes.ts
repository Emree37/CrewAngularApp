import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CrewcardComponent } from './crewcard/crewcard.component';

export const routes: Routes = [
    {
        title: "Ana Sayfa",
        path: "",
        component: HomepageComponent
    },
    {
        title: "Crew Card",
        path: "crewcard/:id",  // Dinamik ID alacak
        component: CrewcardComponent
    }
];
