import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CrewcardComponent } from './crewcard/crewcard.component';
import { CertificateTypeComponent } from './certificate-type/certificate-type.component';
import { CertificatesComponent } from './certificates/certificates.component';

export const routes: Routes = [
    {
        title: "Ana Sayfa",
        path: "",
        component: HomepageComponent
    },
    {
        title: "Crew Card",
        path: "crewcard/:id",
        component: CrewcardComponent
    },
    {
        title: "Certificate Types",
        path: "certificate-type",
        component: CertificateTypeComponent
    },
    {
        title: "Certificates",
        path: "certificates",
        component: CertificatesComponent
      }
];
