import { Component, OnInit } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { TrainerService } from '../../services/trainer.service';
import { StorageKeys } from '../../enums/storage-keys.enum';
import { StorageUtil } from '../../utils/storage.utils';
import { Trainer } from '../../models/trainer.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.page.html',
  styleUrls: ['./trainer-page.page.css'],
})
export class TrainerPagePage implements OnInit {
  userData: any; //entire data from the api
  id: any; //this one needs to be populated using some shared context
  userPokemon: any; //only the user owned pokimons
  username: any; //username of the user

  pokemon: any;

  constructor(
    private http: HttpClient,
    private trainerService: TrainerService,
    private readonly pokemonService: PokemonService
  ) {}

  /**
   * Init function for the trainer page that bring in the data from the api (or pokimons)
   *
   */
  ngOnInit() {
    const userData: Trainer = StorageUtil.storageRead(
      StorageKeys.PokemonTrainer
    ) as Trainer;

    this.id = userData.id;
    this.username = userData.username;

    this.http
      .get(`https://bling-bling.herokuapp.com/trainers?id=${this.id}`)
      .subscribe((data) => {
        this.userData = data;

        if (this.userData) {
          //vet att det här är dumt, men det funkar!

          const result = this.userData.find(
            (x: { id: any }) => x.id === this.id
          );

          if (result) {
            this.userPokemon = result.pokemon;
          }
        }
      });
  }

  /**
   * Get the image of the pokemon
   * @param url
   */

  getPokemonImage(url: string) {
    return this.pokemonService.getPokemonImage(url);
  }

  /**
   * On select function that removes the pokemon from the list
   * and also removes it from the api
   * @param item pokimon item or object
   * @param index the index of the item in the list, helps with removing the item from the list
   * @returns void
   */
  onSelect(item: any, index: number) {


    //make the patch item in ye

    //get the userData based upon item
    const result = this.userData.find((x: { id: any }) => x.id === this.id);
    //change the data list in the result

    result.pokemon.splice(index, 1); //remove the item from the list, also removes from UI

    this.trainerService.removePokemonFromTrainer(this.id, result);
    StorageUtil.storageSave(StorageKeys.PokemonTrainer, result);
    this.trainerService.trainer = result;
  }
}
