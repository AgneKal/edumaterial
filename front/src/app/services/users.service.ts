import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(type: number | null = null){
    return this.http.get<User[]>(`http://localhost:1212/users/${type ? `?type=${type}` : ''}`).pipe(map((users)=>{
      const usersO: User[] = [];
      users.forEach((user) => {
        usersO.push( new User(user.email, user.id, user.name, user.surname, user.phone, user.password, user.type, user.token, user.img));
      });
      return usersO;
    }));
  }

  public getUser(id: number) {
    return this.http.get<User>('http://localhost:1212/users/'+id).pipe(
      map(
        (user) => {
          return new User(user.email, user.id, user.name, user.surname, user.phone, user.password, user.type, user.token);
    }))
  }

  public updateUser(user: User) {
    return this.http.put('http://localhost:1212/users/'+user.id, user)
  }

  public updateUserAndPhoto(user:User, file:any){
    const postUser=new FormData();
    postUser.append('name', user.name!);
    postUser.append('surname', user.surname!);
    postUser.append('phone', user.phone!);
    postUser.append('email', user.email!);
    postUser.append('password', user.password!);
    postUser.append('image',file);
    return this.http.post('http://localhost:1212/users/'+user.id, postUser);
  }

  public deleteUser(id: number) {
    return this.http.delete('http://localhost:1212/users/'+id)
  }


}
