import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorComponent } from '../../helper/error/error.component';
import { LecturesService } from '../../../services/lectures.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Files, Lecture } from '../../../models/lecture';
import { Group } from '../../../models/group';
import { GroupsService } from '../../../services/groups.service';
import { group } from '@angular/animations';


@Component({
  selector: 'app-new-lecture',
  standalone: true,
  imports: [CommonModule, ErrorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './new-lecture.component.html',
  styleUrl: './new-lecture.component.css'
})
export class NewLectureComponent {
  public isError=false;
  public errorText="";

  public lectureForm: FormGroup;
  public uploadedFiles: Files [] = [];
  public fileNames: string [] = [];

  public groups: Group[] =[];
  public group_id: number = 0;
  

  constructor (private lecturesService: LecturesService, private groupsService: GroupsService, private router: Router){
    this.lectureForm = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null),
      'lecture_date': new FormControl(null),
      'group_id': new FormControl(null),
      'files': new FormControl(null)
    });
    this.groupsService.getGroups().subscribe({
      next:(groups) => {
        this.groups = groups;
      }
    })
  }



  public onFileChange(event: any) {
    console.log(event);
    for (var i = 0; i < event.target.files.length; i++) { 
        this.uploadedFiles.push(event.target.files[i]);
        this.fileNames.push(event.target.files[i].name);
    }
  } 
 
  public lectureSubmit(){
    const values = this.lectureForm.value;
    console.log(values);
    this.lecturesService.addLecture(new Lecture(values.title, values.lecture_date, values.description, values.group_id, this.uploadedFiles)).subscribe({
      next:(data) => {
        this.router.navigate(['lectures','list']);
      },
      error:(error) => {
        this.isError=true;
        this.errorText=error.error.text;
      }
    });
  }
}
