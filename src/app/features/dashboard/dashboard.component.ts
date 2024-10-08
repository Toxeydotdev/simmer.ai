import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import DOMPurify from 'dompurify';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { GenericService } from '../../services/generic/generic.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  genericService = inject(GenericService);
  buttonClicked(): void {
    this.genericService.getHelloWorld().subscribe((response) => {
      console.log(response);
    });
  }

  sanitizeHTML(html: string): string {
    return DOMPurify.sanitize(html);
  }

  getArticle(): void {
    this.genericService.getHtmlString().subscribe((response: any) => {
      console.log(response);
      // const parser = new DOMParser();
      // // sanitzed html
      // const sanitizedHtml = this.sanitizeHTML(response.data);
      // console.log(sanitizedHtml);
      // // create doc from sanitized html
      // const doc1 = parser.parseFromString(sanitizedHtml, 'text/html');
      // console.log(doc1);
      // // get readability article
      // let article = new Readability(doc1).parse();
      // console.log(article);
    });

    // let article = new Readability(window.document).parse();
    // console.log(article);
  }
  // getArticle(document: Document): void {
  //   let article = new Readability(document).parse();
  // }
}
