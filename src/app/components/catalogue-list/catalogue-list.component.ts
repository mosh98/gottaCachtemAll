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
    // if (this.hasCaught(pokemon))
    //   return alert(`Already Caught ${pokemon.name}!`);

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

  // showInfo(pokemon: Pokemon): any {
  //   //get the id
  //   const url = pokemon.url;
  //   const id = url
  //     .trim()
  //     .split('/')
  //     .filter((e) => String(e).trim())
  //     .pop(); //get id

  //   let det = null;
  //   this.pokemonService.getPokemonStats(id).subscribe((data: any) => {
  //     console.log(data);

  //     let msg = `HP : ${data.stats[0].base_stat} \n Attack : ${data.stats[1].base_stat} \n Defense : ${data.stats[2].base_stat} \n Speed : ${data.stats[5].base_stat} \n Special Attack : ${data.stats[3].base_stat} \n Special Defense : ${data.stats[4].base_stat} \n`;
  //     alert(msg);
  //   });
  // }
}
