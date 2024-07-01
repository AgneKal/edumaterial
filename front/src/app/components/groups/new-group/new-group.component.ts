import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GroupsService } from '../../../services/groups.service';
import { Router } from '@angular/router';
import { ErrorComponent } from '../../helper/error/error.component';
import { Lecture } from '../../../models/lecture';
import { User } from '../../../models/user';
import { LecturesService } from '../../../services/lectures.service';
import { UsersService } from '../../../services/users.service';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-new-group',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorComponent, ],
  templateUrl: './new-group.component.html',
  styleUrl: './new-group.component.css'
})
export class NewGroupComponent {
  public isError = false;
  public errorText = "";

  public lectures: Lecture[] = [];
  public lecture_id: number | null = null;
  
  public groupLectures: {
    lecture_id: number,
  } [] = [];

  public students: User[] = [];
  public student_id: number | null = null;

  public lecturers: User[] = [];
  public lecturer_id: number | null = null;

  public courses: Course[] = [];
  public course_id: number | null = null;
  
  public groupStudents: {
    student_id: number,
  } [] = [];

  constructor (private groupsService: GroupsService, private coursesServise: CoursesService, private lecturesService: LecturesService, private usersService: UsersService, private router: Router){
    lecturesService.getLectures().subscribe({
      next:(lectures) => {
        this.lectures = lectures;
      }
    });
    usersService.getUsers(2).subscribe({
      next:(users) => {
        this.students = users;
      }
    });
    usersService.getUsers(1).subscribe({
      next:(users) => {
        this.lecturers = users;
      }
    });
    coursesServise.getCourses().subscribe({
      next:(courses) => {
        this.courses = courses;
      }
    });
  }

  public groupSubmit(form:NgForm){
    this.groupsService.addGroup({...form.form.value, lectures: this.groupLectures, students: this.groupStudents}).subscribe({
      next:(result) => {
        this.router.navigate(["/groups", "list"])
      }
    });
  }

  public addLectureToGroup(){
    if (this.lecture_id != null){
      this.groupLectures.push({
        lecture_id: this.lecture_id,
      });
    }
    this.lecture_id = null;
  }

  public getLectureTitle(id: number){
    let result = "";
    this.lectures.forEach((lecture) => { 
      if (lecture.id == id) 
        result = lecture.title;
    });
    return result;
  }

  public deleteLecture(id: number){
    if (id != null){
      this.groupLectures.splice(id, 1);
    }
  }

  public addStudentToGroup(){
    if (this.student_id != null){
      this.groupStudents.push({
        student_id: this.student_id,
      });
    }
    this.student_id = null;
  }

  public getStudentSurname(id: number){
    const student = this.students.find(s => s.id == id)
    return student?.surname
  }

  public getStudentName(id: number){
    const student = this.students.find(s => s.id == id)
    return student?.name
  }

  public deleteStudent(id: number){
    if (id != null){
      this.groupStudents.splice(id,1);
    }
  }
}
