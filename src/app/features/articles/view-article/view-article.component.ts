import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../articles.component';
import { ArticlesService } from '../../../core/services/articles.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

interface Comment {
  id: number;
  content: string;
  created_at: Date;
  updated_at?: Date;
  // article_id: number;
  // user_id: number;
  user: any;
  parent_id?: number;
  replies?: Comment[];
}

@Component({
  selector: 'app-view-article',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.scss',
})
export class ViewArticleComponent implements OnInit {
  article!: Article;
  today = Date.now();

  comments: Comment[] = [];
  commentForm!: FormGroup;
  displayFormReply: boolean = false;

  isLogged: boolean = false;
  authSub!: Subscription;
  userData!: any;

  constructor(
    private _route: ActivatedRoute,
    private articlesService: ArticlesService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userLogged')!);
    this.authSub = this.authService.isLogged$.subscribe((status) => {
      this.isLogged = status;
    });

    const article_id = this._route.snapshot.params['id'];

    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required],
    });

    this.articlesService.getArticleById(article_id).subscribe({
      next: (response) => {
        this.article = response;
        this.loadComments(this.article.id);
      },
      error: () => {},
      complete: () => {},
    });
  }

  loadComments(article_id: number) {
    this.articlesService.getComments(article_id).subscribe((response) => {
      this.comments = response.filter((comment: Comment) => !comment.parent_id);
    });
  }

  createComment(comment_id?: number) {
    if (this.commentForm.valid) {
      const payload = {
        ...this.commentForm.value,
      };

      if (comment_id) payload.parent_id = comment_id;

      this.articlesService
        .createComment(this.article.id, payload)
        .subscribe((response) => {
          this.loadComments(this.article.id);
        });
    }
    this.commentForm.reset();
  }

  deleteComment(comment_id: number) {
    this.articlesService.deleteComment(comment_id).subscribe((response) => {
      this.loadComments(this.article.id);
    });
  }
}
