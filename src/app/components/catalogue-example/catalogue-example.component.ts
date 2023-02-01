import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-catalogue-example',
  templateUrl: './catalogue-example.component.html',
  styleUrls: ['./catalogue-example.component.css'],
})
export class CatalogueExampleComponent {
  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) {}

  pokemons: Pokemon[] = [];

  ngOnInit() {
    // this.pokemonCatalogueService.fetchPokemons().subscribe((pokemons) => {
    //   this.pokemons = pokemons;
    // });
  }
}
