import { Routes } from '@angular/router';
import { PrincipalLayoutComponent } from './layouts/principal-layout/principal-layout.component';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { authGuard } from '@auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PrincipalLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    pathMatch: 'full',
    children: [
      {
        path: 'home',
        component: FeedPageComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
