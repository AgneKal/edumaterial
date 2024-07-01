import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})

export class ListUsersComponent {
  public users: User[] =[];
  private loadData(){
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      }
    });
  }

  constructor(private usersService: UsersService){
    this.loadData();
  }

  public onDeleteClick(id: number){
    this.usersService.deleteUser(id).subscribe({
      next: (result) => {
        this.loadData();
      }
    })
  }

}