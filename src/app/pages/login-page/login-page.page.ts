import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { StorageUtil } from 'src/app/utils/storage.utils';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.css'],
})
export class LoginPagePage implements OnInit {
  constructor(private readonly router: Router) {}

  /**
   * If the user is already logged in, redirect to the catalogue page
   * @returns void
   * @memberof LoginPagePage
   * @method ngOnInit
   */
  ngOnInit(): void {
    if (StorageUtil.storageRead(StorageKeys.PokemonTrainer))
      this.router.navigateByUrl('catalogue-page');
  }

  /**
   * Handle the login action & navigate to the catalogue page
   * @returns void
   * @memberof LoginPagePage
   * @method handleLogin
   *
   */
  handleLogin(): void {
    this.router.navigateByUrl('catalogue-page');
  }
}
