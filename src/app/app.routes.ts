import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CrewcardComponent } from './crewcard/crewcard.component';
import { CertificateTypeComponent } from './certificate-type/certificate-type.component';
import { CertificatesComponent } from './certificates/certificates.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomepageComponent, title: 'Ana Sayfa' },
            { path: 'crewcard/:id', component: CrewcardComponent, title: 'Crew Card' },
            { path: 'certificate-type', component: CertificateTypeComponent, title: 'Certificate Types' },
            { path: 'certificates', component: CertificatesComponent, title: 'Certificates' }
        ]
    }
];
