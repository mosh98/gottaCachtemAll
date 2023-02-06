import { Component } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-catalogue-hero',
  templateUrl: './catalogue-hero.component.html',
  styleUrls: ['./catalogue-hero.component.css'],
})
export class CatalogueHeroComponent {
  constructor(private readonly trainerService: TrainerService) {}

  trainerUsername() {
    return this.trainerService.trainer?.username;
  }

  /**
   * Logs out the current trainer.
   * @returns void
   * @memberof CatalogueHeroComponent
   */
  logout(): void {
    this.trainerService.logout();
  }
}
