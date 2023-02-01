import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonCatalogueService {
  constructor(private readonly http: HttpClient) {}

  private pokemonApiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private _spriteUrlById(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  fetchPokemons(): Observable<Pokemon | undefined> {
    return this.http
      .get<Pokemon[]>(`${this.pokemonApiUrl}?limit=20`)
      .pipe(map((res: Pokemon[]) => res.pop()));
  }
}
