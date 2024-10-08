import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-main-toolbar',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule],
  templateUrl: './main-toolbar.component.html',
  styleUrl: './main-toolbar.component.scss',
})
export class MainToolbarComponent {
  router = inject(Router);

  userAuthenticated = computed(() => true);

  logout(): void {}

  openTab(url: string): void {
    window.open(url, '_blank');
  }
}
