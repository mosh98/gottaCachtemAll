import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})

export class TrainerService {

  constructor(private  http:HttpClient) { }

  //make a patch request to remove a specific pokimon
  public removePokemonFromTrainer(userId:number, pokemonId:number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'x-api-key': apiKey,})

    };
    let patchUrl = apiTrainers+`/${userId}`
    return this.http.patch(patchUrl, {pokemon: pokemonId}, httpOptions)
  }

}
