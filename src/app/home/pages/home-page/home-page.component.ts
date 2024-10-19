import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignUpFormComponent } from '@auth/components/sign-up-form/sign-up-form.component';
import { DialogModule } from 'primeng/dialog';
import { SignInFormComponent } from '../../../auth/components/sign-in-form/sign-in-form.component';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
    SignUpFormComponent,
    DialogModule,
    RouterModule,
    SignInFormComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  showSignUpForm = signal(false);
  showSignInForm = signal(false);
  showAuthModal = computed(
    () => this.showSignInForm() || this.showSignUpForm()
  );
}
