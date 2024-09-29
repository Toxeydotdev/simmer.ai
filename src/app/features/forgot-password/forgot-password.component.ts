import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { delay, finalize, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CardModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  authService = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);
  email = signal<string>('');
  validEmail = computed(
    () => this.email().includes('@') && this.email().includes('.')
  );
  processing = signal<boolean>(false);
  error = signal<string>('');
  resetPasswordForEmail(): void {
    this.processing.update(() => true);
    this.authService
      .resetPasswordForEmail(this.email())
      .pipe(
        delay(1000),
        tap(({ data, error }) => {
          console.log(data, error);
          if (data) {
            this.messageService.add({
              severity: 'success',
              summary: 'Password reset',
              detail: 'Check your email for a password reset link.',
            });
            this.router.navigate(['/login']);
          }
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
