import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonListResponse } from '../models/pokemon-list-response.model';
import { PokemonResponse } from '../models/pokemon-response.model';

const apiUrl: string = `https://pokeapi.co/api/v2/pokemon`;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}
  private readonly _pokemonList$: BehaviorSubject<Pokemon[]> =
    new BehaviorSubject<Pokemon[]>([]);
  private readonly _pokemon$: BehaviorSubject<Pokemon> =
    new BehaviorSubject<Pokemon>({} as Pokemon);
  private _spriteUrlById(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  get pokemonList$(): Observable<Pokemon[]> {
    return this._pokemonList$.asObservable();
  }
  get pokemon$(): Observable<Pokemon> {
    return this._pokemon$.asObservable();
  }

  getPokemonList(): void {
    this.http
      .get<PokemonListResponse>(apiUrl)
      .pipe(
        map((res: PokemonListResponse) => {
          return res.results;
        })
      )
      .subscribe({
        next: (pokemonList: Pokemon[]) => {
          this._pokemonList$.next(pokemonList);
        },
        error: (error: HttpErrorResponse) => {
          // Handle error msg
        },
      });
  }

  getPokemon(id: number): void {
    this.http
      .get<PokemonResponse>(`${apiUrl}/${id}`)
      .pipe(
        map((res: PokemonResponse) => {
          return { name: res.name, url: `${apiUrl}/${res.id}` };
        })
      )
      .subscribe({
        next: (pokemon: Pokemon) => {
          this._pokemon$.next(pokemon);
        },
        error: (error: HttpErrorResponse) => {
          // Handle error msg
        },
      });
  }
}
