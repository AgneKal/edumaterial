import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ErrorComponent } from '../../helper/error/error.component';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { GroupsService } from '../../../services/groups.service';
import { User } from '../../../models/user';
import { Course } from '../../../models/course';
import { LecturesService } from '../../../services/lectures.service';
import { UsersService } from '../../../services/users.service';
import { CoursesService } from '../../../services/courses.service';
import { Lecture } from '../../../models/lecture';

@Component({
  selector: 'app-update-group',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorComponent],
  templateUrl: './update-group.component.html',
  styleUrl: './update-group.component.css'
})
export class UpdateGroupComponent {
  
  public lecture_id: number | null = null;
  public lectures: Lecture[] = [];

  public student_id: number | null = null;
  public students: User[] = [];

  public lecturers: User[] = [];
  public courses: Course[] = [];

  public title = '';
  public start: Date | null = null;
  public end: Date | null = null;
  public lecturer = '';
  public lecturer_id = 0;
  public course_id = 0;
  public courses_title = '';
  public groupLectures: {id: number}[] = [];
  public groupStudents: {id: number}[] = [];
  public id? = null;

  public isError = false;
  public errorText = '';

  constructor(private route: ActivatedRoute, private router: Router, private groupsService: GroupsService, private lecturesService: LecturesService, private usersService: UsersService, private coursesService: CoursesService){
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
    coursesService.getCourses().subscribe({
      next:(courses) => {
        this.courses = courses;
      }
    });

    this.groupsService.getGroup(this.route.snapshot.params['id']).subscribe({
      next: ([group]) => {
        this.title = group.title;
        this.start = group.start;
        this.end = group.end;
        this.lecturer = group.lecturer;
        this.lecturer_id = group.lecturer_id;
        this.course_id = group.course_id;
        this.courses_title = group.courses_title;
        this.groupLectures = group.lectures;
        this.groupStudents = group.students;
      },
      error: (error) => {
        this.isError = true;
        this.errorText = error.error.text;
      } 
    });
  }
  
  public groupSubmit(form: NgForm){
    this.groupsService.updateGroup({id: this.id, ...form.form.value}).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['groups', 'list']);
      },
      error: (error) => {
        this.isError = true;
        this.errorText = error.error.text;
      }
    })
  }

  public addLectureToGroup(){
    if (this.lecture_id != null){
      this.groupLectures.push({
        id: this.lecture_id,
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
        id: this.student_id,
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
