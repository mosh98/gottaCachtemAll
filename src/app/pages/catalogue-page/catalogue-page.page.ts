import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.page.html',
  styleUrls: [],
})
export class CataloguePagePage {
  displayedPokemon: Pokemon | undefined;
  showModal: boolean = false;

  receiveModalIsHidden($modalIsHidden: boolean) {
    this.showModal = $modalIsHidden;
  }

  receivePokemon($pokemon: Pokemon) {
    if (this.showModal === true) return (this.showModal = false);
    this.showModal = true;
    return (this.displayedPokemon = $pokemon);
  }
}
