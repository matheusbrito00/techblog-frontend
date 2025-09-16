import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  authSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSub = this.authService.isLogged$.subscribe((status) => {
      this.isLogged = status;
    });
  }

  logout() {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('userToken');
    this.authService.isLoggedSub.next(false);
    this.router.navigateByUrl('/signin');
  }
}
