import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../../models/course';
import { CoursesService } from '../../../services/courses.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-list-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.css'
})
export class ListCoursesComponent {

  public courses: Course[] = [];

  private loadCourses(){
    this.coursesService.getCourses().subscribe((data) => {
      this.courses = data;
      });
    }
    
  constructor(private coursesService: CoursesService, public authService: AuthService){
    this.loadCourses();
  }
  
  public deleteCourse(id: number){
    this.coursesService.deleteCourse(id).subscribe((data) => {
      this.loadCourses();
    });
  }

}
