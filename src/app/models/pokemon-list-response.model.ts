import { Pokemon } from './pokemon.model';

//Define the interface 'PokemonListResponse' with the property 'results' of type 'Pokemon'
export interface PokemonListResponse {
  results: Pokemon[];
}
