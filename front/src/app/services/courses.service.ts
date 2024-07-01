import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient, authService: AuthService) { }
  
  public getCourses() {
    return this.http.get<Course[]>('http://localhost:1212/courses/')
  }

  public getCourse(id: number){
    return this.http.get<Course>('http://localhost:1212/courses/'+id);
  }
  
  public addCourse(course: Course) {
    return this.http.post('http://localhost:1212/courses', course);
  }
  
  public updateCourse(course: Course){
    return this.http.put<Course>('http://localhost:1212/courses/', course);
  }

  public deleteCourse(id: number){
    return this.http.delete('http://localhost:1212/courses/'+id);
  }

}
