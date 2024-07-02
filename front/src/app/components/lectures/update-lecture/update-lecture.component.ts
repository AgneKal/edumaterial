import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from '../../helper/error/error.component';
import { LecturesService } from '../../../services/lectures.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Files, Lecture } from '../../../models/lecture';
import { Group } from '../../../models/group';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-update-lecture',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorComponent, RouterLink],
  templateUrl: './update-lecture.component.html',
  styleUrl: './update-lecture.component.css'
})
export class UpdateLectureComponent {
  public lectureForm: FormGroup;
  public uploadedFiles: Files[] = [];
  public filesList: Files[] = [];

  public fileNames: string [] = [];

  
  isError: boolean = false;
  errorText: any;

  public groups: Group[] =[];
  public group_id: number = 0;

  constructor (private route: ActivatedRoute, private lecturesService: LecturesService, private groupsService: GroupsService, private router: Router){
    this.lectureForm = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null),
      'lecture_date': new FormControl(Date),
      'group_id': new FormControl(null),
      'files': new FormControl(null),
    });
    this.lecturesService.getLecture(this.route.snapshot.params['id']).subscribe((lecture) => {
        this.lectureForm.setValue({
          title: lecture.title,
          description: lecture.description,
          lecture_date: lecture.lecture_date,
          group_id: lecture.group_id,
          files: []
        });
        this.filesList = lecture.files
        this.lectureForm.updateValueAndValidity();
      });
    this.groupsService.getGroups().subscribe({
      next:(groups) => {
        this.groups = groups;
      }
    })
  }

  public lectureSubmit(){
    const values = this.lectureForm.value;
    this.lecturesService.updateLecture(new Lecture(values.title, values.lecture_date, values.description, values.group_id, this.uploadedFiles, '', this.route.snapshot.params['id'])).subscribe({
      next:(data) => {
        //this.router.navigate(['/lectures','list']);
        location.reload()
      },
      error:(error) => {
        this.isError = true;
        this.errorText = error.error.text;
      }
    });
  }
  
  public toggleFileVisibility(event: any, id: number) {
    event.preventDefault();
    const visibility = event.target.checked === true;
    this.lecturesService.toggleFileVisibility(id, visibility).subscribe({
      next: (result: any) => {
        event.target.checked = result.visibility;
      }
    })
  }
  
  
  public onFileChange(event:any) {
    for (var i = 0; i < event.target.files.length; i++) { 
        this.uploadedFiles.push(event.target.files[i]);
        this.fileNames.push(event.target.files[i].name);
    }
  }

  public deleteFile(id: number) {
    this.lecturesService.deleteFile(id).subscribe((data) => {
      window.location.reload();
      
    });
  }

}
