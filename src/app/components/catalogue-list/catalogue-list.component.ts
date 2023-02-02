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
    alert("Pokemon Abducted!")
    if (this.hasCaught(pokemon))
      // Fix proper error
      alert("Already Caught!")
      return console.log('Already caught!');
    console.log(pokemon);
    let trainer: Trainer = StorageUtil.storageRead(StorageKeys.PokemonTrainer)!;
    console.log(trainer.pokemon);

    let tempList = [...trainer.pokemon, pokemon];
    this.trainerService.addPokemonToTrainer(trainer.id, {
      ...trainer,
      pokemon: tempList,
    });
    alert("Pokemon Abducted!")
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

    let det = null
    this.pokemonService.getPokemonStats(id).subscribe((data: any) => {
      console.log(data);
      det = data;
      let msg = `HP : ${det.stats[0].base_stat} \n Attack : ${det.stats[1].base_stat} \n Defense : ${det.stats[2].base_stat} \n Speed : ${det.stats[5].base_stat} \n Special Attack : ${det.stats[3].base_stat} \n Special Defense : ${det.stats[4].base_stat} \n`
      alert(msg)


    });

  }
}
