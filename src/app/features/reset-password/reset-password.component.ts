import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { finalize, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  authService = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);

  password = signal<string>('');
  passwordConfirm = signal<string>('');
  validPassword = computed(() => this.password() === this.passwordConfirm());
  processing = signal<boolean>(false);
  error = signal<string>('');

  resetPassword(): void {
    this.processing.update(() => true);
    this.authService
      .resetPassword(this.password())
      .pipe(
        tap(({ data, error }) => {
          if (error) {
            this.error.update(() => error.message);
          } else if (data) {
            this.messageService.add({
              severity: 'success',
              summary: 'Password reset',
              detail: 'Your password has been reset.',
            });
            this.router.navigate(['/login']);
          }
        }),
        finalize(() => {
          this.processing.update(() => false);
        })
      )
      .subscribe();
  }
}
