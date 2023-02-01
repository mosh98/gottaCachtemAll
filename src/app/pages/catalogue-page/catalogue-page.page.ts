import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Trainer } from 'src/app/models/trainer.model';
import { StorageUtil } from 'src/app/utils/storage.utils';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.page.html',
  styleUrls: ['./catalogue-page.page.css'],
})
export class CataloguePagePage implements OnInit {
  currentTrainer: Trainer = JSON.parse(
    localStorage.getItem(StorageKeys.PokemonTrainer)!
  );

  ngOnInit(): void {
    console.log(this.currentTrainer);
  }
}
