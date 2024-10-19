import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Credentials } from '@auth/interfaces/credentials.interface';
import { AuthService } from '@auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'auth-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css',
})
export class SignInFormComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  signInForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get username(): FormControl {
    return this.signInForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const credentials: Credentials = this.signInForm.value as Credentials;
    this.signIn(credentials);
  }

  signIn(credentials: Credentials): void {
    this.authService.signIn(credentials).subscribe({
      next: () => {
        this.router.navigate(['/app/home']);
      },
      error: (err) => {
        this.username.setErrors({ credentialsNotValid: true });
        this.password.setErrors({ credentialsNotValid: true });
      },
    });
  }
}
