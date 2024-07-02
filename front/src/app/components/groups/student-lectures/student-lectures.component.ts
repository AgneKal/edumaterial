import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../../services/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LecturesService } from '../../../services/lectures.service';
import { UsersService } from '../../../services/users.service';
import { CoursesService } from '../../../services/courses.service';
import { Group } from '../../../models/group';
import { CommonModule } from '@angular/common';
import { Lecture } from '../../../models/lecture';


@Component({
  selector: 'app-student-lectures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-lectures.component.html',
  styleUrl: './student-lectures.component.css'
})
export class StudentLecturesComponent implements OnInit{

  lectures: Lecture[] = [];
  groupId: number | undefined;
  
  // public group: Group = {
  //   title: '',
  //   start: new Date,
  //   end: new Date,
  //   lecturer: '',
  //   lecturer_id: 0,
  //   course_id: 0,
  //   courses_title: '',
  //   lectures: [],
  //   students: [],
  //   id: 0
  // };

  constructor(private route: ActivatedRoute, private groupsService: GroupsService, private lecturesService: LecturesService){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupId = +params['id'];
      this.fetchLectures();
    });
  }

  public fetchLectures(){
    this.lecturesService.getLectures(this.groupId).subscribe(data => {
      console.log(data);
       this.lectures = data;
     });
  }
}
