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

  ngOnInit(): void {
    if (StorageUtil.storageRead(StorageKeys.PokemonTrainer))
      this.router.navigateByUrl('catalogue-page');
  }

  handleLogin(): void {
    this.router.navigateByUrl('catalogue-page');
  }
}
