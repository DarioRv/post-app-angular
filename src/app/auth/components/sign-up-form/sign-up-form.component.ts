import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { RequestStatus } from '@common/types/request-status.type';
import { AuthService } from '@auth/services/auth.service';
import { CreateUser } from '@auth/interfaces/create-user.interface';
@Component({
  selector: 'auth-sign-up-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css',
})
export class SignUpFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  createUserForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  status: RequestStatus = 'idle';

  constructor(private readonly messageService: MessageService) {}

  get username(): FormControl {
    return this.createUserForm.get('username') as FormControl;
  }

  get fullName(): FormControl {
    return this.createUserForm.get('fullName') as FormControl;
  }

  get email(): FormControl {
    return this.createUserForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.createUserForm.get('password') as FormControl;
  }

  onSubmit(): void {
    if (this.createUserForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario inválido',
        detail: 'Por favor, complete todos los campos',
      });
      this.createUserForm.markAllAsTouched();
      return;
    }

    const createUser = this.createUserForm.value as CreateUser;
    this.createUser(createUser);
  }

  createUser(createUser: CreateUser): void {
    this.authService.signUp(createUser).subscribe({
      next: (user) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'Puede iniciar sesión',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al intentar registrarse',
          detail: err,
          styleClass: 'h-12',
          contentStyleClass: 'text-xs',
        });
      },
    });
  }
}
