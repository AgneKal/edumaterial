import { Component } from '@angular/core';
import { ErrorComponent } from '../../helper/error/error.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesService } from '../../../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-course',
  standalone: true,
  imports: [ErrorComponent, CommonModule,FormsModule],
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.css'
})
export class NewCourseComponent {
  public isError=false;
  public errorText="";
  constructor (private coursesService: CoursesService, private router: Router){
 
  }
 
  public courseSubmit(form: NgForm){
    this.coursesService.addCourse(form.form.value).subscribe({
      next:(data)=>{
        this.router.navigate(['courses','list']);
      },
      error:(error)=>{
        this.isError=true;
        this.errorText=error.error.text;
      }
    });
  }
}
