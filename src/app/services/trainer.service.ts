import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  public addPokemonToTrainer(userId: number, body_: any): Observable<Trainer> {
    /**
     * NOTE: NOT USED ANYWHERE YET
     * */

    //userId = 3

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
}
