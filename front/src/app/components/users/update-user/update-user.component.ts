import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { ErrorComponent } from '../../helper/error/error.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  public id?: number;
  public email: String = '';
  public name: String = '';
  public surname: String = '';
  public phone: String ='';
  public password: String ='';
  public type: number = 0;

  constructor(private route: ActivatedRoute, private router:Router, private usersService: UsersService) {
    this.id = this.route.snapshot.params['id'];
    this.usersService.getUser(this.id!).subscribe({
      next:(user) => {
        this.email = user.email;
        this.name = user.name!;
        this.surname = user.surname!;
        this.phone = user.phone!;
        this.type = user.type!;
      }
    })
  }

  public userSubmit(form:NgForm){
    this.usersService.updateUser({id:this.id, ...form.form.value}).subscribe({
      next:(data) => {
        this.router.navigate(['users','list']);
      }
    })
  }
}