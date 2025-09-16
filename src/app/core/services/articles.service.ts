import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Article } from '../../features/articles/articles.component';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private url: string = environment.backendUrl;
  private articlesCache = new Map<number, Article>();
  private articlesSub = new BehaviorSubject<Article[]>([]);
  private articles$ = this.articlesSub.asObservable();

  constructor(private http: HttpClient) {}

  // TAGS
  getTags(): Observable<any> {
    return this.http.get(`${this.url}/tags`);
  }

  // ARTICLES
  getArticles(): Observable<any> {
    return this.http.get(`${this.url}/articles`);
  }

  getArticleById(article_id: number): Observable<Article> {
    return this.http.get<Article>(`${this.url}/articles/${article_id}`);
  }

  createArticle(data: any): Observable<any> {
    return this.http.post(`${this.url}/articles`, data);
  }

  updateArticle(data: any): Observable<any> {
    return this.http.put(`${this.url}/articles/${data.id}`, data);
  }

  deleteArticle(article_id: number): Observable<any> {
    return this.http.delete(`${this.url}/articles/${article_id}`);
  }

  // COMMENTS
  getComments(article_id: number): Observable<any> {
    return this.http.get(`${this.url}/articles/${article_id}/comments`);
  }

  createComment(article_id: number, data: any): Observable<any> {
    return this.http.post(`${this.url}/articles/${article_id}/comments`, data);
  }

  deleteComment(comment_id: number): Observable<any> {
    return this.http.delete(`${this.url}/comments/${comment_id}`);
  }
}
