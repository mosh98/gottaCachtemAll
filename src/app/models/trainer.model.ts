import { Pokemon } from './pokemon.model';

//Define the interface 'Trainer' with the properties 'id', 'username' and 'pokemon' of type 'Pokemon'
export interface Trainer {
  id: number;
  username: string;
  pokemon: Pokemon[];

}
