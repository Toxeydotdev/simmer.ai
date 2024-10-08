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
}
