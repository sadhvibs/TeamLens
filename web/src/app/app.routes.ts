import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CreateTaskComponent } from './features/tasks/create-task/create-task.component';
import { CreateProjectComponent } from './features/projects/create-project/create-project.component';
import { AllProjectsComponent } from './features/projects/all-projects/all-projects.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'projects',
        component: CreateProjectComponent
    },
    {
        path: 'all-projects',
        component: AllProjectsComponent
    },
    {
        path: 'tasks',
        component: CreateTaskComponent
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
