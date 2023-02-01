import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { StorageUtil } from 'src/app/utils/storage.utils';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.page.html',
  styleUrls: ['./catalogue-page.page.css'],
})
export class CataloguePagePage {
  // constructor(private readonly pokemonService: PokemonService) {}
  // currentTrainer: Trainer = StorageUtil.storageRead(
  //   StorageKeys.PokemonTrainer
  // )!;
  // ngOnInit(): void {
  //   console.log(this.currentTrainer);
  //   this.pokemonService.getPokemonList();
  // }
  // get pokemonList$(): Observable<Pokemon[]> {
  //   return this.pokemonService.pokemonList$;
  // }
  // get pokemon$(): Observable<Pokemon> {
  //   return this.pokemonService.pokemon$;
  // }
}
