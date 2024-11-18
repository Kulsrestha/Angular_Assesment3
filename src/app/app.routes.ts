import { Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { VerifyEmailComponent } from './components/shared/verify-email/verify-email.component';
import { AssignIncidentComponent } from './components/admin/assign-incident/assign-incident.component';
import { FormsComponent } from './components/shared/forms/forms.component';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin-dashboard', component: DashboardComponent },
    { path: 'rep-dashboard', component: DashboardComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
    { path: 'assign-incident', component: AssignIncidentComponent },
    { path: 'report-incident', component: FormsComponent },
];
