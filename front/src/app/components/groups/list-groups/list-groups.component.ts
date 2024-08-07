import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group';

@Component({
  selector: 'app-list-groups',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-groups.component.html',
  styleUrl: './list-groups.component.css'
})
export class ListGroupsComponent {

  public groups: Group[] = [];

  private loadGroups(){
    this.groupsService.getGroups().subscribe((data) => {
      this.groups = data;
      });
    }
    
  constructor (public authService: AuthService, private groupsService: GroupsService){
    this.loadGroups();
  }
  
  public deleteGroup(id: number){
    this.groupsService.deleteGroup(id).subscribe((data) => {
      this.loadGroups();
    });
  }
  
}
