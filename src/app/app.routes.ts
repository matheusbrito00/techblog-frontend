import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./features/signin/signin.component').then(
        (m) => m.SigninComponent
      ),
  },
  {
    path: 'articles',
    loadComponent: () =>
      import('./features/articles/articles.component').then(
        (m) => m.ArticlesComponent
      ),
  },
  {
    path: 'articles/wizard',
    loadComponent: () =>
      import('./features/articles/create-edit-article/create-edit-article.component').then(
        (m) => m.CreateEditArticleComponent
      ),
  },
  {
    path: 'articles/wizard/:id',
    loadComponent: () =>
      import('./features/articles/create-edit-article/create-edit-article.component').then(
        (m) => m.CreateEditArticleComponent
      ),
  },
  {
    path: 'articles/:id',
    loadComponent: () =>
      import('./features/articles/view-article/view-article.component').then(
        (m) => m.ViewArticleComponent
      ),
  },
  { path: '**', redirectTo: '' },
  { path: '', pathMatch: 'full', redirectTo: '' },
];
