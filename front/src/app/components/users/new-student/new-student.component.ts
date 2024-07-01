import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-new-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.css'
})
export class NewStudentComponent {
  public signinForm: FormGroup;
  public passwordsMatch: boolean = true;

  constructor(private authService: AuthService, private errorService: ErrorService){
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, this.validateEmail]),
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'surname': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'phone': new FormControl(null, [Validators.required, this.validatePhoneNumber]),
      'password': new FormControl(null, [Validators.required, this.validatePassword]),
    })
  }

  public onRegister(){
    this.authService.registerUser(this.signinForm.value).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    });
  }

  validateEmail(control: FormControl): ValidationErrors | null {
    const email: string = control.value;
    const pattern = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
      if (pattern.test(email)){
        return null;
      } else {
        return {error: 'El. pašto adresas neatitinka el. pašto adreso formato'};
      }
  }

  validatePassword(control: FormControl): ValidationErrors | null {
    const password: string = control.value;

    const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
      if (pattern.test(password)){
        return null;
      } else {
        return {error: 'Slaptažodis neatitinka taisyklių'};
      }
  }

  validatePhoneNumber(control: FormControl): ValidationErrors | null {
    const phoneNumber: string = control.value;
    const pattern = /^\+370[0-9]{8}$/;

    if (pattern.test(phoneNumber)){
      return null;
    } else {
      return {error: 'Klaida'};
    }
  }

  comparePasswords(passwordRepeat: string | null) {
      const password = this.signinForm.get('password')?.value;
      if (password != passwordRepeat) {
        this.passwordsMatch = false;
      } else {
        this.passwordsMatch = true;
      }
  }
}