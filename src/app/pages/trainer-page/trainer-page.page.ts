import {Component, OnInit} from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {TrainerService} from "../../services/trainer.service";
import {StorageKeys} from "../../enums/storage-keys.enum";
import {StorageUtil} from "../../utils/storage.utils";
import {Trainer} from "../../models/trainer.model";

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.page.html',
  styleUrls: ['./trainer-page.page.css']
})
export class TrainerPagePage implements OnInit{

  userData: any; //entire data from the api
  id: any; //this one needs to be populated using some shared context
  userPokemon: any; //only the user owned pokimons
  username: any; //username of the user
  private selectedItem: any; //selected items to be removed.

  pokemon:any;

  constructor(private http:HttpClient, private TrainerServce:TrainerService ) {}


    ngOnInit(){
      const userData: Trainer = StorageUtil.storageRead(StorageKeys.PokemonTrainer) as Trainer;

      this.id = userData.id;
      this.username = userData.username;

      this.http.get(`https://bling-bling.herokuapp.com/trainers?id=${this.id}` ).subscribe(data =>{

      this.userData = data;

      if (this.userData) { //vet att det här är dumt, men det funkar!

        console.log(this.userData)
        const result = this.userData.find((x: { id: any; }) => x.id === this.id);

        if (result) {
          this.userPokemon = result.pokemon
        }
      }
    });

      this.TrainerServce.hardCode(2,null)
    }

    getPokimonImage(namn:string){
    //get image id
      const data = null
      let id = 3

      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }

  onSelect(item: any, index:number) {
    //make the patch item in ye
    this.selectedItem = item;

    //get the userData based upon item
    const result = this.userData.find((x: { id: any; }) => x.id === this.id);
    //change the data list in the result

    result.pokemon.splice(index,1) //remove the item from the list, also removes from UI

    this.TrainerServce.removePokemonFromTrainer(this.id,result)
    StorageUtil.storageSave(StorageKeys.PokemonTrainer, result)
  }

}
