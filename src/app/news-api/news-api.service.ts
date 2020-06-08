import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, switchMap, tap, pluck } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NewsApiResponse, Article } from './news-model';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '9da6f44827df48ca88bd9c697eb49f62';
  private country = 'no';

  private pageInput: Subject<number>;
  pageOutput: Observable<Article[]>;
  numberOfPages: Subject<number>;
  constructor(private http: HttpClient) {
    this.pageInput = new Subject();
    this.numberOfPages = new Subject();
    this.pageOutput = this.pageInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey', this.apiKey)
          .set('country', this.country)
          .set('pageSize', String(this.pageSize))
          .set('page', String(page));
      }),
      switchMap((params) => {
        return this.http.get<NewsApiResponse>(this.url, { params });
      }),
      tap((res: NewsApiResponse) => {
        const totalPages = Math.ceil(res.totalResults / this.pageSize);
        this.numberOfPages.next(totalPages);
      }),
      pluck('articles')
    );
  }

  getPage(page: number) {
    this.pageInput.next(page);
  }
}
