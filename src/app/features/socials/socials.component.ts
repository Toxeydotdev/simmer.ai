import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss',
})
export class SocialsComponent {
  socials = [
    {
      name: 'Twitter',
      icon: 'pi pi-twitter',
      url: 'https://x.com/Toxeydotdev',
    },
    {
      name: 'Buy Me a Coffee',
      icon: 'pi pi-wallet',
      url: 'https://buymeacoffee.com/toxey',
    },
  ];
  openTab(url: string): void {
    window.open(url, '_blank');
  }
}
