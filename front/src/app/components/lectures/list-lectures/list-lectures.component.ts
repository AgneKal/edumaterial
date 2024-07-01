import { Component } from '@angular/core';
import { Lecture } from '../../../models/lecture';
import { LecturesService } from '../../../services/lectures.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group';

@Component({
  selector: 'app-list-lectures',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-lectures.component.html',
  styleUrl: './list-lectures.component.css'
})
export class ListLecturesComponent {
  public lectures: Lecture[] = [];
  
  private loadLectures(){
    this.lecturesService.getLectures().subscribe((data) => {
      this.lectures = data;
      });
    }
    
  constructor(private lecturesService: LecturesService, public authService: AuthService){
    this.loadLectures();
  }
  
  public deleteCourse(id: number){
    this.lecturesService.deleteLecture(id).subscribe((data) => {
      this.loadLectures();
    });
  }
}
