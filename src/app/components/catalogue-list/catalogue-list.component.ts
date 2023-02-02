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
  showPopUpCard = false;

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList();
  }

  generatePokemonImg(url: string): string {
    const id = url
      .trim()
      .split('/')
      .filter((e) => String(e).trim())
      .pop();

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
  }

  addToCollection(pokemon: Pokemon): void {
    console.log(pokemon)
    let trainer: Trainer = StorageUtil.storageRead(StorageKeys.PokemonTrainer)!;
    console.log(trainer.pokemon);

    let tempList = [...trainer.pokemon, pokemon];
    this.trainerService.addPokemonToTrainer(trainer.id, {
      ...trainer,
      pokemon: tempList,
    });
  }

  get pokemonList$(): Observable<Pokemon[]> {
    return this.pokemonService.pokemonList$;
  }

  showInfo(pokemon:Pokemon): any {
    //get the id
    const url = pokemon.url
    const id = url
      .trim()
      .split('/')
      .filter((e) => String(e).trim())
      .pop(); //get id
    //get pokimon stats
    this.showPopUpCard = true;
    //const item = PokemonService.getPokemonStats()



  }
}
