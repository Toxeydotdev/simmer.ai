import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Provider } from '@supabase/supabase-js';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { delay, finalize, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    InputIconModule,
    IconFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  email = signal<string>('');

  validEmail = computed(
    () => this.email().includes('@') && this.email().includes('.')
  );
  password = signal<string>('');
  processing = signal<boolean>(false);
  error = signal<string>('');

  login(): void {
    this.processing.update(() => true);
    this.authService
      .signIn(this.email(), this.password())
      .pipe(
        delay(500),
        tap(({ data, error }) => {
          if (error) {
            this.error.update(() => error.message);
          }
        }),
        finalize(() => {
          this.processing.update(() => false);
        })
      )
      .subscribe();
  }

  loginWithOAuth(provider: Provider): void {
    this.authService
      .signInWithOAuth(provider)
      .pipe(
        delay(500),
        tap(({ data, error }) => {
          console.log(data, error);
          if (error) {
            this.error.update(() => error.message);
          }
        }),
        finalize(() => {
          this.processing.update(() => false);
        })
      )
      .subscribe();
  }
}
