import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonListResponse } from '../models/pokemon-list-response.model';
import { PokemonResponse } from '../models/pokemon-response.model';
import { StorageUtil } from '../utils/storage.utils';
import { StorageKeys } from '../enums/storage-keys.enum';
import { environment } from 'src/environments/environment';

const apiUrl: string = environment.apiUrl

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

  /**
   * Pokemon list observable
   * @returns Observable<Pokemon[]>
   *   If pokemon list is available: returns pokemon list
   *   If pokemon list is not available: returns empty array
   */
  get pokemonList$(): Observable<Pokemon[]> {
    return this._pokemonList$.asObservable();
  }

  /**
   * Pokemon observable
   * @returns Observable<Pokemon>
   */
  get pokemon$(): Observable<Pokemon> {
    return this._pokemon$.asObservable();
  }

  /**
   * Get pokemon list
   * @returns void
   *  If pokemon list is available: returns pokemon list
   *  If pokemon list is not available: returns empty array
   *  If error: returns error
   *
   */
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

  /**
   * Get pokemon stats
   * @param id
   * @returns Observable<Pokemon>
   *   If pokemon stats are available: returns pokemon stats
   *   If pokemon stats are not available: returns empty object
   *   If error: returns error
   */
  getPokemonStats(id: any): any {
    this.http
      .get<any>(`${apiUrl}/${id}`)
      .pipe(

        map((res: PokemonResponse) => {

          return { name: res.name, url: `${apiUrl}/${res.id}`, stats:res.stats}
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
