import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() pokemonEvent = new EventEmitter<Pokemon>();
  sendPokemon(pokemon: Pokemon) {
    this.pokemonEvent.emit(pokemon);
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

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  }

  hasCaught(pokemon: Pokemon): boolean {
    return this.trainerService.hasCaught(pokemon);
  }

  addToCollection(pokemon: Pokemon): void {
    let trainer: Trainer = StorageUtil.storageRead(StorageKeys.PokemonTrainer)!;

    let tempList = [...trainer.pokemon, pokemon];
    this.trainerService.addPokemonToTrainer(trainer.id, {
      ...trainer,
      pokemon: tempList,
    });
  }

  get pokemonList$(): Observable<Pokemon[]> {
    return this.pokemonService.pokemonList$;
  }
}
