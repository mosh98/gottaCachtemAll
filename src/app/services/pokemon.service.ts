import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonListResponse } from '../models/pokemon-list-response.model';
import { PokemonResponse } from '../models/pokemon-response.model';
import { StorageUtil } from '../utils/storage.utils';
import { StorageKeys } from '../enums/storage-keys.enum';
import { environment } from 'src/environments/environment';

const apiUrl: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}
  private readonly _pokemonList$: BehaviorSubject<Pokemon[]> =
    new BehaviorSubject<Pokemon[]>([]);
  private readonly _pokemon$: BehaviorSubject<Pokemon> =
    new BehaviorSubject<Pokemon>({} as Pokemon);

  get pokemonList$(): Observable<Pokemon[]> {
    return this._pokemonList$.asObservable();
  }
  get pokemon$(): Observable<Pokemon> {
    return this._pokemon$.asObservable();
  }

  getPokemonList(): void {
    if (StorageUtil.storageRead(StorageKeys.Pokemon)) {
      return this._pokemonList$.next(
        StorageUtil.storageRead(StorageKeys.Pokemon)!
      );
    }

    this.http
      .get<PokemonListResponse>(apiUrl)
      .pipe(
        map((res: PokemonListResponse) => {
          return res.results;
        })
      )
      .subscribe({
        next: (pokemonList: Pokemon[]) => {
          StorageUtil.storageSave(StorageKeys.Pokemon, pokemonList);
          this._pokemonList$.next(pokemonList);
        },
        error: (error: HttpErrorResponse) => {
          // Handle error msg
        },
      });
  }

  getPokemonImage(url: string, hasAltUrl?: boolean) {
    const id = url
      .trim()
      .split('/')
      .filter((e) => String(e).trim())
      .pop();
    if (hasAltUrl) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  }

  getPokemonStats(name: string): Observable<Pokemon> {
    this.http
      .get<any>(`${apiUrl}/${name}`)
      .pipe(
        map((res: PokemonResponse) => {
          return {
            name: res.name,
            url: `${apiUrl}/${res.name}`,
            stats: res.stats,
          };
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
    return this._pokemon$.asObservable();
  }
}
