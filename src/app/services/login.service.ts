import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const apiTrainers = environment.apiTrainers;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  // Checks if user exists, if not: create user.
  /**
   * Login user
   * @param username Username
   * @returns Observable<Trainer>
   *   If user exists: returns user
   *   If user does not exist: creates user and returns user
   *   If error: returns error
   * */
  login(username: string): Observable<Trainer> {
    return this.checkUser(username).pipe(
      switchMap((trainer: Trainer | undefined) => {
        if (trainer === undefined) {
          return this.createUser(username);
        }
        return of(trainer);
      })
    );
  }

  //
  /**
   * Checks if user exists
   * @param username Username
   * @returns Observable<Trainer | undefined>
   *   If user exists: returns user
   *   If user does not exist: returns undefined
   * */
  private checkUser(username: string): Observable<Trainer | undefined> {
    return this.http
      .get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(map((res: Trainer[]) => res.pop()));
  }

  /**
   * Creates new user
   * @param username Username
   * @returns Observable<Trainer>
   *   If user is created: returns user
   *   If error: returns error
   *
   */

  private createUser(username: string): Observable<Trainer> {
    const user = {
      username,
      pokemon: [],
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http.post<Trainer>(apiTrainers, user, { headers });
  }
}
