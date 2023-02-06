import { Component } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-hero',
  templateUrl: './trainer-hero.component.html',
  styleUrls: [],
})
export class TrainerHeroComponent {
  constructor(private readonly trainerService: TrainerService) {}

  trainerUsername() {
    return this.trainerService.trainer?.username;
  }
}
