import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TrainerService } from '../services/trainer.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly route: Router,
    private readonly trainerService: TrainerService
  ) {}

  /**
   * Check if trainer is present in sessionStorage
   * If not, redirect to login-page
   * @param route
   * @param state
   * @returns boolean
   * @returns UrlTree
   * @returns Observable<boolean | UrlTree>
   *       | Promise<boolean | UrlTree>
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // If there's no trainer present in sessionStorage, redirect to login-page
    if (this.trainerService.trainer) {
      return true;
    }
    this.route.navigateByUrl('login-page');
    return false;
  }
}
