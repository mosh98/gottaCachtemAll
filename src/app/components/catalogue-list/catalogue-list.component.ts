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

  /**
   * Emits the selected pokemon to the parent component.
   * @type {EventEmitter<Pokemon>}
   * @memberof CatalogueListComponent
   * @see https://angular.io/guide/component-interaction#parent-listens-for-child-event
   * @see https://angular.io/guide/component-interaction#parent-calls-an-viewchild
   * @see https://angular.io/guide/component-interaction#parent-calls-an-viewchildren
   */
  @Output() pokemonEvent = new EventEmitter<Pokemon>();

  /**
   * Sends the selected pokemon to the parent component.
   * @param pokemon
   * @returns void
   * @memberof CatalogueListComponent
   */
  sendPokemon(pokemon: Pokemon) {
    this.pokemonEvent.emit(pokemon);
  }

  /**
   * Gets the pokemon list from the pokemon service.
   * @returns void
   * @memberof CatalogueListComponent
   *
   */
  ngOnInit(): void {
    this.pokemonService.getPokemonList();
  }

  /**
   * Generates the pokemon image url.
   * @param url
   * @returns string
   * @memberof CatalogueListComponent
   *
   */
  generatePokemonImg(url: string): string {
    const id = url
      .trim()
      .split('/')
      .filter((e) => String(e).trim())
      .pop();

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  }

  /**
   * Checks if the pokemon is already caught.
   * @param pokemon
   * @returns boolean
   * @memberof CatalogueListComponent
   */

  /**
   * Checks if the pokemon is already caught.
   * @param pokemon
   * @returns boolean
   * @memberof CatalogueListComponent
   */
  hasCaught(pokemon: Pokemon): boolean {
    return this.trainerService.hasCaught(pokemon);
  }

  /**
   * Adds the pokemon to the trainer's collection.
   * @param pokemon
   * @returns void
   * @memberof CatalogueListComponent
   */
  addToCollection(pokemon: Pokemon): void {
    let trainer: Trainer = StorageUtil.storageRead(StorageKeys.PokemonTrainer)!;

    let tempList = [...trainer.pokemon, pokemon];
    this.trainerService.addPokemonToTrainer(trainer.id, {
      ...trainer,
      pokemon: tempList,
    });
  }

  /**
   * Gets the pokemon list from the pokemon service.
   * @returns Observable<Pokemon[]>
   *  @memberof CatalogueListComponent
   */
  get pokemonList$(): Observable<Pokemon[]> {
    return this.pokemonService.pokemonList$;
  }
}
