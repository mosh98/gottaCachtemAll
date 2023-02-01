import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { StorageUtil } from 'src/app/utils/storage.utils';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.css'],
})
export class CatalogueListComponent implements OnInit {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrainerService
  ) {}

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  ngOnInit(): void {
    this.pokemonService.getPokemonList();
  }

  generatePokemonImg(url: string): string {
    const id = url
      .trim()
      .split('/')
      .filter((e) => String(e).trim())
      .pop();

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  addToCollection(pokemon: Pokemon): void {
    if (!this.trainer) return;
    console.log(this.trainer.pokemon);
    // console.log(this.currentTrainer.pokemon as unknown as Pokemon[]);
    // this.trainerService.addPokemonToTrainer(this.currentTrainer.id, [
    //   ...currentList,
    //   pokemon,
    // ]);
  }

  get pokemonList$(): Observable<Pokemon[]> {
    return this.pokemonService.pokemonList$;
  }
}
