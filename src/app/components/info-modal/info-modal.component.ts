import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css'],
})
export class InfoModalComponent implements OnInit {
  constructor(private readonly pokemonService: PokemonService) {}

  statTest: any;

  @Input() pokemon!: Pokemon;
  @Input() showModal!: boolean;
  ngOnInit(): void {
    this.getPokemonStats(this.pokemon.name)
      .pipe(
        map((res: Pokemon) => {
          return res.stats;
        })
      )
      .subscribe((stats) => {
        this.statTest = stats;
        console.log(this.statTest);
        return stats;
      });
  }

  @Output() modalEvent = new EventEmitter<boolean>();

  sendModalIsHidden() {
    this.modalEvent.emit(false);
  }

  getPokemonStats(pokemonName: string): Observable<Pokemon> {
    return this.pokemonService.getPokemonStats(pokemonName);
  }

  getPokemonImage(url: string, hasAltUrl?: boolean) {
    if (hasAltUrl) return this.pokemonService.getPokemonImage(url, hasAltUrl);
    return this.pokemonService.getPokemonImage(url);
  }
}
