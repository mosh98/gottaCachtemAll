import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
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


  constructor(private http:HttpClient) {
    this._trainer = StorageUtil.storageRead<Trainer>(
      StorageKeys.PokemonTrainer
    );
  }

  public removePokemonFromTrainer(userId:number, body_:any): Observable<Trainer>{
    console.log("Trainer service called") //remove this
    let train : any;

    let apiKey= 'abcdefg'
    let apiTrainers= 'https://bling-bling.herokuapp.com/trainers'

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'x-api-key': apiKey})
    };
    let patchUrl = apiTrainers+`/${userId}`

    this.http.patch<Trainer>(patchUrl, body_, httpOptions).subscribe((val) => {
      console.log("PATCH call successful value returned in body",
        val);
    })
    this.addPokemonToTrainer(userId, body_)
    //return this.http.patch<Trainer>(patchUrl, body_, httpOptions).subscribe(console.log("PATCHED"))
    return this.http.patch<Trainer>(patchUrl, body_, httpOptions)
  }

  public addPokemonToTrainer(userId:number, body_:any): Observable<Trainer> {
    let someData = JSON.parse(localStorage.getItem('pokemon-trainer')!)

    //dummy data for body
    let body = {
      "pokemon": [
        "bulbasaur",
        "charmander",
        "squirtle",
        "pikachu"],
      "username": "Melv"
    }
    userId = 3 //TODO:FIX THIS dummy data for userId

    let apiKey= 'abcdefg'
    let apiTrainers= 'https://bling-bling.herokuapp.com/trainers'

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'x-api-key': apiKey})
    };
    let patchUrl = apiTrainers+`/${userId}`

    //TODO: change body to body_

    this.http.patch<Trainer>(patchUrl, body, httpOptions).subscribe((val) => {
      console.log("PATCH call successful value returned in body", val);
    })

    return this.http.patch<Trainer>(patchUrl, body, httpOptions);
  }

}
