// src/app/services/search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiKey = '368ffe3e0e334d7ca43aabab3dedcb40';
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  search(query: string, page: number = 1, limit: number = 20): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('size', limit.toString())
      .set('page', page)
      .set('apiKey', this.apiKey);

    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
