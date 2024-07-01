import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../../services/error.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../helper/error/error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private errorService: ErrorService) {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  public onLogin() {
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    })
  }
}
