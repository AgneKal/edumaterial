import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  public isLoggedin: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
    if(authService.isLoggedin()){
      this.isLoggedin = true;
    } else {
      this.isLoggedin = false;
    }

    this.authService.onLoginStatusChange.subscribe((isLoggedin) => {
      this.isLoggedin = isLoggedin;
    })
  
  }

  public logoutClick(){
    this.authService.logOut();
    this.isLoggedin = false;
    this.router.navigate(["/"]);
  }
}