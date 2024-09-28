import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    InputIconModule,
    IconFieldModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = signal<string>('');
  validEmail = computed(
    () => this.email().includes('@') && this.email().includes('.')
  );
  password = signal<string>('');
  passwordConfirm = signal<string>('');
  validPassword = computed(() => this.password() === this.passwordConfirm());
  processing = signal<boolean>(false);
  error = signal<string>('');

  signUp(): void {
    this.processing.update(() => true);
    this.authService
      .createUser(this.email(), this.password())
      .subscribe(({ data, error }) => {
        if (error) {
          this.error.update(() => error.message);
        }
      });
  }
}
