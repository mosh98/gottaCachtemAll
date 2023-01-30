import {Component, OnInit} from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.page.html',
  styleUrls: ['./trainer-page.page.css']
})
export class TrainerPagePage implements OnInit{
  userData: any;

  constructor(private http:HttpClient) {
  }

    ngOnInit(){
    this.http.get('https://bling-bling.herokuapp.com/trainers').subscribe(data =>{
      console.log(data)
      this.userData =data
    });
    }

}
