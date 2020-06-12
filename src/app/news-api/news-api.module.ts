import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaArticleListComponent } from './na-article-list/na-article-list.component';
import { TrimOUtletNamePipe } from './trim-outlet-name.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NaArticleListComponent, TrimOUtletNamePipe],
  imports: [CommonModule, SharedModule],
  exports: [NaArticleListComponent],
})
export class NewsApiModule {}
