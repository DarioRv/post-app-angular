import { Component, inject, signal } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-principal-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './principal-layout.component.html',
  styleUrl: './principal-layout.component.css',
})
export class PrincipalLayoutComponent {
  private readonly authService = inject(AuthService);

  public currentUser = signal(this.authService.currentUser()!);
  menu: MenuItem[] = [
    {
      icon: 'pi-home',
      label: 'Inicio',
      routerLink: 'home',
    },
    {
      icon: 'pi-user',
      label: 'Perfil',
      routerLink: 'profile',
    },
  ];
}
