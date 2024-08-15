import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignUpFormComponent } from '@auth/components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from '@auth/components/sign-in-form/sign-in-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'X. Es lo que está pasando / X',
    children: [
      {
        path: 'sign-up',
        component: SignUpFormComponent,
      },
      {
        path: 'sign-in',
        component: SignInFormComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
