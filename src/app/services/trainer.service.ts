import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  public removePokemonFromTrainer(userId:number, body_:any){
    console.log("Trainer service called")
    let apiKey= 'abcdefg'
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'x-api-key': apiKey})
    };
    let apiTrainers= 'https://bling-bling.herokuapp.com/trainers'
    let patchUrl = apiTrainers+`/${userId}`

    return this.http.patch(patchUrl, body_, httpOptions)

  }
  //addPokimonToTrainer
  /*public addPokemonToTrainer(userId:number, body_:any){
    let apiKey= 'abcdefg'
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'x-api-key': apiKey})
    }
    let apiTrainers= 'https://bling-bling.herokuapp.com/trainers'
    let patchUrl = apiTrainers
    return this.http.post(patchUrl, body_, httpOptions)

  }*/


}
