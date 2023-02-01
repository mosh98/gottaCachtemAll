import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.css'],
})
export class LoginPagePage {
  constructor(private readonly router: Router) {}

  handleLogin(): void {
    this.router.navigateByUrl('catalogue-page');
  }
}
