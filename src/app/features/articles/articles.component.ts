import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from '../../core/services/articles.service';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NgModel,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

export interface Tag {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  title: string;
  image?: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  tags: Tag[];
  comments?: any[];
  user_id: number;
  user: any;
}

@Component({
  selector: 'app-articles',
  imports: [CommonModule, FormsModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent implements OnInit, OnDestroy {
  tags: Tag[] = [];
  selectedTags: number[] = [];
  searchArticle: string = '';
  articles: Article[] = [];

  isLogged: boolean = false;
  authSub!: Subscription;
  userData!: any;

  currentPage: number = 1;
  pageSize: number = 3;

  constructor(
    private authService: AuthService,
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userLogged')!);
    this.authSub = this.authService.isLogged$.subscribe((status) => {
      this.isLogged = status;
    });

    this.articlesService.getTags().subscribe({
      next: (response) => {
        this.tags = response;
      },
      error: (e) => {},
      complete: () => {},
    });

    this.articlesService.getArticles().subscribe({
      next: (response) => {
        this.articles = response;
      },
      error: (e) => {},
      complete: () => {},
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  viewArticle(article_id: number) {
    this.router.navigate(['/articles', article_id]);
  }

  createArticle() {
    this.router.navigateByUrl('/articles/wizard');
  }

  editArticle(article_id: number) {
    this.router.navigateByUrl(`/articles/wizard/${article_id}`);
  }

  toggleTag(tagId: number) {
    const idx = this.selectedTags.indexOf(tagId);

    if (idx === -1) {
      this.selectedTags.unshift(tagId);
    } else {
      this.selectedTags.splice(idx, 1);
    }
  }

  isTagSelected(tagId: number): boolean {
    return this.selectedTags.includes(tagId);
  }

  get filteredArticles() {
    if (this.selectedTags.length === 0)
      return this.articles.filter((article) =>
        article.title
          .toLocaleLowerCase()
          .includes(this.searchArticle.toLocaleLowerCase())
      );

    return this.articles.filter(
      (article) =>
        article.tags.some((tag) => this.selectedTags.includes(tag.id)) &&
        article.title
          .toLocaleLowerCase()
          .includes(this.searchArticle.toLocaleLowerCase())
    );
  }

  get pagedArticles() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredArticles.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredArticles.length / this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
