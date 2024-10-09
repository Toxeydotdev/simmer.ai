import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  http = inject(HttpClient);

  getHtmlString(url: string) {
    return from(this.http.post('/.netlify/functions/get-recipe', { url }));
  }
}
