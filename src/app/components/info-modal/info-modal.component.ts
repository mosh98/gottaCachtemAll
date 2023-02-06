import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: [],
})
export class InfoModalComponent implements OnInit {
  constructor(private readonly pokemonService: PokemonService) {}

  statTest: any;

  @Input() pokemon!: Pokemon;
  @Input() showModal!: boolean;

  /**
   * @description
   * This function is called when the component is initialized.
   * It calls the getPokemonStats function from the pokemon service
   * and maps the response to the stats property of the pokemon model.
   * It then subscribes to the observable and sets the statTest property
   * to the response.
   * @returns {Observable<Pokemon>}
   * @memberof InfoModalComponent
   * @see {@link PokemonService}
   * @see {@link Pokemon}
   */
  ngOnInit(): void {
    this.getPokemonStats(this.pokemon.name)
      .pipe(
        map((res: Pokemon) => {
          return res.stats;
        })
      )
      .subscribe((stats) => {
        this.statTest = stats;
        return stats;
      });
  }

  /**
   * @description
   * This function is called when the modal is closed.
   * It emits a boolean value to the parent component
   * to hide the modal.
   * @memberof InfoModalComponent
   * @see {@link PokemonComponent}
   */
  @Output() modalEvent = new EventEmitter<boolean>();

  /**
   * @description This function is called when the modal is closed.
   * It emits a boolean value to the parent component to hide the modal.
   * @memberof InfoModalComponent
   * @see {@link PokemonComponent}
   */
  sendModalIsHidden() {
    this.modalEvent.emit(false);
  }

  /**
   * @description
   * This function is called when the component is initialized.
   * It calls the getPokemonStats function from the pokemon service
   * @param pokemonName
   * @returns {Observable<Pokemon>}
   * @memberof InfoModalComponent
   * @see {@link PokemonService}
   */

  getPokemonStats(pokemonName: string): Observable<Pokemon> {
    return this.pokemonService.getPokemonStats(pokemonName);
  }

  /**
   * @description This function is called when the component is initialized.
   * @param url
   * @param hasAltUrl
   * @returns {Observable<Pokemon>}
   * @memberof InfoModalComponent
   * @see {@link PokemonService}
   */
  getPokemonImage(url: string, hasAltUrl?: boolean) {
    if (hasAltUrl) return this.pokemonService.getPokemonImage(url, hasAltUrl);
    return this.pokemonService.getPokemonImage(url);
  }
}
