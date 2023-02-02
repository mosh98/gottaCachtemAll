import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _trainer?: Trainer;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.PokemonTrainer, trainer!);
    this._trainer = trainer;
  }

  constructor(private http: HttpClient) {
    this._trainer = StorageUtil.storageRead<Trainer>(
      StorageKeys.PokemonTrainer
    );
  }

  hasCaught(pokemon: Pokemon): boolean {
    let ownedPokemon: Pokemon[] = this._trainer?.pokemon.map(
      (item) => item as unknown as Pokemon
    )!;
    console.log(ownedPokemon);

    if (!ownedPokemon) return false;

    for (let i = 0; i < ownedPokemon.length; i++) {
      if (ownedPokemon[i].name === pokemon.name) {
        return true;
      }
    }
    return false;
  }

  public addPokemonToTrainer(
    userId: number,
    body_: Trainer
  ): Observable<Trainer> {
    let apiKey = 'abcdefg'; //TODO:FIX THIS
    let apiTrainers = 'https://bling-bling.herokuapp.com/trainers'; //TODO:FIX THIS

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      }),
    };
    let patchUrl = apiTrainers + `/${userId}`;

    this.http.patch<Trainer>(patchUrl, body_, httpOptions).subscribe((val) => {
      console.log('PATCH call successful ADD POKIMON', val);
    });
    StorageUtil.storageSave(StorageKeys.PokemonTrainer, body_);

    return this.http.patch<Trainer>(patchUrl, body_, httpOptions);
  }

  public removePokemonFromTrainer(
    userId: number,
    body_: any
  ): Observable<Trainer> {
    console.log('Trainer service called'); //remove this

    let apiKey = 'abcdefg'; //TODO:FIX THIS
    let apiTrainers = 'https://bling-bling.herokuapp.com/trainers'; //TODO:FIX THIS

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      }),
    };
    let patchUrl = apiTrainers + `/${userId}`;

    this.http.patch<Trainer>(patchUrl, body_, httpOptions).subscribe((val) => {
      console.log('PATCH call successful REMOVE POKIMON', val);
    });

    return this.http.patch<Trainer>(patchUrl, body_, httpOptions);
  }
}
