import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public profileForm:FormGroup;
  public imagePreview: String | null = null;
 
  constructor (private userService:UsersService, private authService:AuthService, private router: Router){
    this.profileForm = new FormGroup({
      'email': new FormControl(null),
      'name': new FormControl(null),
      'surname': new FormControl(null),
      'phone': new FormControl(null),
      'password': new FormControl(null),
      'image': new FormControl(null)
    });

  
    if (authService.user!=null && authService.user.id!=null){
      userService.getUser(authService.user.id).subscribe((user)=>{
       
        this.profileForm.setValue({
          email: user.email,
          name: user.name,
          surname: user.surname,
          phone: user.phone,
          password: '',
          image: null
        });
        this.profileForm.updateValueAndValidity();;
      });
    }
  }
 
  public onSubmitForm(){
    const values = this.profileForm.value;
    this.userService.updateUserAndPhoto(new User(values.email, this.authService.user!.id, values.name, values.surname, values.phone, values.password ), values.image ).subscribe((result) => {
      this.router.navigate(["/"]); 
    });
  }

  public onProfileImageChange(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as String;
    }
    reader.readAsDataURL(file);

    this.profileForm.patchValue({
      image: file
    });

    this.profileForm.get('image')?.updateValueAndValidity();
  }
 
}
