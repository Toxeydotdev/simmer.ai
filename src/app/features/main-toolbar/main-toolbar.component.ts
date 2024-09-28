import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-main-toolbar',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule],
  templateUrl: './main-toolbar.component.html',
  styleUrl: './main-toolbar.component.scss',
})
export class MainToolbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  userAuthenticated = computed(() => this.authService.isAuthenticated());

  logout(): void {
    this.authService.signOut().subscribe();
  }
}
