import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _trainer?: Trainer;
  private apiKey = environment.apiKey;
  private apiTrainers = environment.apiTrainers;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  /**
   * Sets the trainer and saves it to local storage
   * @param trainer
   * @returns void
   * @memberof TrainerService
   * @description This is a setter method that sets the trainer and saves it to local storage
   */
  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.PokemonTrainer, trainer!);
    this._trainer = trainer;
  }

  /**
   * Creates an instance of TrainerService.
   * @param {HttpClient} http
   * @param http
   * @param router
   * @memberof TrainerService
   * @description This is the constructor method for the TrainerService class
   * @description This method also sets the trainer to the value stored in local storage
   */
  constructor(private http: HttpClient, private router: Router) {
    this._trainer = StorageUtil.storageRead<Trainer>(
      StorageKeys.PokemonTrainer
    );
  }

  /**
   * @param pokemon
   * @returns {Trainer | undefined}
   * @memberof TrainerService
   * @description This is a getter method that returns the trainer
   * @description This method also sets the trainer to the value stored in local storage
   * @description This method is used to get the trainer from the local storage
   */
  hasCaught(pokemon: Pokemon): boolean {
    let ownedPokemon: Pokemon[] = this._trainer?.pokemon!;
    if (!ownedPokemon) return false;

    for (let i = 0; i < ownedPokemon.length; i++) {
      if (ownedPokemon[i].name === pokemon.name) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {number} userId
   * @returns {Observable<Trainer>}
   * @memberof TrainerService
   * @description This is a method that gets the trainer from the API
   */

  logout() {
    if (!confirm('Are you sure you want to logout?')) return;
    StorageUtil.storageClear();
    return this.router.navigateByUrl('/login-page');
  }

  /**
   * @param {number} userId
   * @param body_
   * @returns {Observable<Trainer>}
   * @discription Add pokemon to trainer & update api
   */
  public addPokemonToTrainer(
    userId: number,
    body_: Trainer
  ): Observable<Trainer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      }),
    };
    let patchUrl = this.apiTrainers + `/${userId}`;

    this.http.patch<Trainer>(patchUrl, body_, httpOptions).subscribe((val) => {
      console.log('PATCH call successful ADD POKIMON', val);
    });
    StorageUtil.storageSave(StorageKeys.PokemonTrainer, body_);
    this._trainer = body_;

    return this.http.patch<Trainer>(patchUrl, body_, httpOptions);
  }

  /**
   *
   * @param userId
   * @param body_
   * @returns {Observable<Trainer>}
   * @discription Remove pokemon from trainer & update api
   * @description This is also method that removes a pokemon from the trainer
   */
  public removePokemonFromTrainer(
    userId: number,
    body_: any
  ): Observable<Trainer> {
    console.log('Trainer service called'); //remove this

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      }),
    };
    let patchUrl = this.apiTrainers + `/${userId}`;

    this.http.patch<Trainer>(patchUrl, body_, httpOptions).subscribe((val) => {
      console.log('PATCH call successful REMOVE POKIMON', val);
    });

    return this.http.patch<Trainer>(patchUrl, body_, httpOptions);
  }
}
