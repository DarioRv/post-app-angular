import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignUpFormComponent } from '@auth/components/sign-up-form/sign-up-form.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [SignUpFormComponent, DialogModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  signUpModalVisible = false;
}
