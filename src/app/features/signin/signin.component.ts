import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.autoLogin();
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      const payload = this.signinForm.value;
      this.authService.signIn(payload).subscribe({
        next: (response) => {
          if (response) {
            localStorage.setItem('userLogged', JSON.stringify(response.user));
            localStorage.setItem('userToken', response.access_token);
          } else {
            this.errorMessage = 'Usuario ou senha inválidos';
            // this.snackbarService.displaySimpleSnackbar(
            //   this.errorMessage,
            //   'error'
            // );
          }
        },
        error: (e) => {
          // this.loading = false;
          this.errorMessage = 'Usuario ou senha inválidos';
          // this.snackbarService.displaySimpleSnackbar(
          //   this.errorMessage,
          //   'error'
          // );
        },
        complete: () => {
          this.authService.isLoggedSub.next(true);
          this.router.navigateByUrl('/articles');
        },
      });
    } else {
      this.errorMessage = 'Por favor, digite os campos corretamente';
      // this.snackbarService.displaySimpleSnackbar(this.errorMessage, 'error');
    }
  }

  autoLogin() {
    if (this.authService.userToken) {
      this.authService.validateToken().subscribe((response) => {
        if (response) {
          this.authService.isLoggedSub.next(true);
          this.router.navigateByUrl('/articles');
        }
      });
    }
  }
}
