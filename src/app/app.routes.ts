import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.routes').then((r) => r.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
