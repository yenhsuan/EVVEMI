import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './components/home/home.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const route: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'create',
    component: FormComponent
  },
  {
    path: 'update',
    component: FormComponent
  },
  {
    path: 'list',
    component: ListComponent

  },
  {
    path: 'course-list',
    component: CourseListComponent

  },
  {
    path: '**',
    redirectTo: 'home'
  },

];

export const Route = RouterModule.forRoot(route);