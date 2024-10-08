import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  http = inject(HttpClient);
  constructor() {}

  getHelloWorld() {
    return from(this.http.get('/.netlify/functions/hello-world'));
  }

  getHtmlString() {
    return from(
      this.http.post('/.netlify/functions/get-html-string', {
        value:
          'https://www.thechunkychef.com/family-favorite-baked-mac-and-cheese/',
      })
    );
  }
}
