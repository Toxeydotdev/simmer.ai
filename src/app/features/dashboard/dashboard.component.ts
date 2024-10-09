import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import DOMPurify from 'dompurify';
import { MarkdownComponent } from 'ngx-markdown';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize, tap } from 'rxjs';
import { GenericService } from '../../services/generic/generic.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    MarkdownComponent,
    SkeletonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  genericService = inject(GenericService);
  messageService = inject(MessageService);

  content = signal<string>('');
  processing = signal<boolean>(false);
  inputUrl: string = '';

  sanitizeHTML(html: string): string {
    return DOMPurify.sanitize(html);
  }

  getArticle(): void {
    this.processing.update(() => true);
    this.genericService
      .getHtmlString(this.inputUrl)
      .pipe(
        tap({
          next: (response: { urlInput?: string; recipe?: string }) => {
            this.content.update(
              () => response.recipe || 'No content found for this URL'
            );
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred',
            }),
        }),
        finalize(() => {
          this.processing.update(() => false);
        })
      )
      .subscribe();
  }
}
