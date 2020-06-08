import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../news-api.service';
import { Article } from '../news-model';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrls: ['./na-article-list.component.css'],
})
export class NaArticleListComponent implements OnInit {
  articles: Article[];
  constructor(private nps: NewsApiService) {}

  ngOnInit(): void {
    this.nps.pageOutput.subscribe((articles) => (this.articles = articles));
    this.nps.getPage(1);
  }
}
