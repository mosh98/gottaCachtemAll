import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly loginService: LoginService,
    private readonly trainerService: TrainerService
  ) {}

  // Fetches username from form on submit and passes through to login service.
  loginSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;

    this.loginService.login(username).subscribe({
      next: (trainer: Trainer) => {
        this.trainerService.trainer = trainer;
        this.login.emit();
      },
      error: () => {
        // Handle errors.
      },
    });
  }
}
