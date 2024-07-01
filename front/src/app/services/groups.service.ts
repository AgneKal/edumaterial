import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor (private http: HttpClient, public authService: AuthService){} 

  public getGroups() {
    return this.http.get<Group[]>('http://localhost:1212/groups/')
  }

  public getGroup(id: number){
    return this.http.get<Group[]>('http://localhost:1212/groups/'+id);
  }
  
  public addGroup(group: Group) {
  return this.http.post('http://localhost:1212/groups', group);
  }
  
  public updateGroup(group: Group){
    return this.http.put<Group>('http://localhost:1212/groups/'+group.id, group);
  }

  public deleteGroup(id: number){
    return this.http.delete('http://localhost:1212/groups/'+id);
  }
}
