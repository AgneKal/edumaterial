import { Component } from '@angular/core';
import { Lecture } from '../../../models/lecture';
import { User } from '../../../models/user';
import { Course } from '../../../models/course';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GroupsService } from '../../../services/groups.service';
import { LecturesService } from '../../../services/lectures.service';
import { UsersService } from '../../../services/users.service';
import { CoursesService } from '../../../services/courses.service';
import { CommonModule } from '@angular/common';
import { Group } from '../../../models/group';

@Component({
  selector: 'app-student-groups',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-groups.component.html',
  styleUrl: './student-groups.component.css'
})


export class StudentGroupsComponent {

  public groups: Group[] = [];
  // public lecture_id: number | null = null;
  // public lectures: Lecture[] = [];

  // public lecturers: User[] = [];
  // public courses: Course[] = [];

  // public title = '';
  // public start: Date | null = null;
  // public end: Date | null = null;
  // public lecturer = '';
  // public lecturer_id = 0;
  // public course_id = 0;
  // public courses_title = '';
  // public groupLectures: {id: number}[] = [];
  // public id? = null;

  // public isError = false;
  // public errorText = '';

  constructor(private route: ActivatedRoute, private router: Router, private groupsService: GroupsService, private lecturesService: LecturesService, private usersService: UsersService, private coursesService: CoursesService){
    this.groupsService.getGroups().subscribe((data) => {
      this.groups = data;
      });
  }

  viewLectures(groupId: number) {
    this.router.navigate(['/groups', groupId, 'lectures']);
  }

  // public getLectureTitle(id: number){
  //   let result = "";
  //   this.lectures.forEach((lecture) => { 
  //     if (lecture.id == id) 
  //       result = lecture.title;
  //   });
  //   return result;
  // }
}
