import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.routes').then((r) => r.routes),
  },
  {
    path: 'app',
    loadChildren: () => import('./feed/feed.routes').then((r) => r.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
