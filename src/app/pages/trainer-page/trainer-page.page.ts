import {Component, OnInit} from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {TrainerService} from "../../services/trainer.service";
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
  private selectedItem: any; //selected items to be removed.

  constructor(private http:HttpClient, private TrainerServce:TrainerService ) {}


    ngOnInit(){
    let someData = JSON.parse(localStorage.getItem('pokemon-trainer')!)
      this.id = someData.id;

      this.http.get(`https://bling-bling.herokuapp.com/trainers?id=${this.id}` ).subscribe(data =>{

      this.userData = data;

      if (this.userData) {
        const result = this.userData.find((x: { id: any; }) => x.id === this.id);

        if (result) {
          this.userPokemon = result.pokemon
        }
      }
    });

    }

  onSelect(item: any, index:number) {
    //make the patch item in ye
    this.selectedItem = item;

    //get the userData based upon item
    const result = this.userData.find((x: { id: any; }) => x.id === this.id);
    //change the data list in the result

    result.pokemon.splice(index,1)
    console.log(typeof result)
    console.log(result)

    this.TrainerServce.removePokemonFromTrainer(this.id,result)
  }

}
