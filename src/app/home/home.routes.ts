import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'X. Es lo que está pasando / X',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
