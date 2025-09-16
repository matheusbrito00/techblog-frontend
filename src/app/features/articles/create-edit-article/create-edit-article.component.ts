import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Article, Tag } from '../articles.component';
import { ArticlesService } from '../../../core/services/articles.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-edit-article',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './create-edit-article.component.html',
  styleUrl: './create-edit-article.component.scss',
})
export class CreateEditArticleComponent implements OnInit {
  tags: Tag[] = [];
  selectedTags: number[] = [];
  article!: Article;

  articleForm!: FormGroup;

  constructor(
    private articlesService: ArticlesService,
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.articlesService.getTags().subscribe((response) => {
      this.tags = response;
    });

    const article_id = this._route.snapshot.params['id'];

    if (article_id) {
      this.articlesService.getArticleById(article_id).subscribe({
        next: (response) => {
          this.article = response;
          this.articleForm = this.formBuilder.group({
            id: [this.article.id, Validators.required],
            title: [this.article.title, Validators.required],
            content: [this.article.content, Validators.required],
            tag_ids: [[], Validators.required],
          });
          this.article.tags.forEach((tag) => {
            this.toggleTag(tag.id);
          });
        },
        error: () => {},
        complete: () => {},
      });
    } else {
      this.articleForm = this.formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        tag_ids: [[], Validators.required],
      });
    }
  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.articlesService.createArticle(this.articleForm.value).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.router.navigate(['/articles']);
        },
      });
    }
  }

  toggleTag(tagId: number) {
    const idx = this.selectedTags.indexOf(tagId);

    if (idx === -1) {
      this.selectedTags.unshift(tagId);
    } else {
      this.selectedTags.splice(idx, 1);
    }

    this.articleForm.controls['tag_ids'].setValue(this.selectedTags);
  }

  isTagSelected(tagId: number): boolean {
    return this.selectedTags.includes(tagId);
  }
}
