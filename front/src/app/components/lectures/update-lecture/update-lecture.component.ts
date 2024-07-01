import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from '../../helper/error/error.component';
import { LecturesService } from '../../../services/lectures.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Files, Lecture } from '../../../models/lecture';

@Component({
  selector: 'app-update-lecture',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorComponent],
  templateUrl: './update-lecture.component.html',
  styleUrl: './update-lecture.component.css'
})
export class UpdateLectureComponent {
  public lectureForm: FormGroup;
  public uploadedFiles: Files[] = [];
  public filesList: Files[] = [];
  isError: boolean = false;
  errorText: any;

  constructor (private route: ActivatedRoute, private lecturesService: LecturesService, private router: Router){
    this.lectureForm = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null),
      'lecture_date': new FormControl(null),
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
        this.lectureForm.updateValueAndValidity();;
      });
  }

  public lectureSubmit(){
    const values = this.lectureForm.value;
    console.log(values);
    this.lecturesService.addLecture(new Lecture(values.title, values.lecture_date, values.description, values.group_id, this.uploadedFiles)).subscribe({
      next:(data) => {
        this.router.navigate(['/lectures','list']);
      },
      error:(error) => {
        this.isError = true;
        this.errorText = error.error.text;
      }
    });
  }

  public onFileChange(event:any) {
    for (var i = 0; i < event.target.files.length; i++) { 
        this.uploadedFiles.push(event.target.files[i]);
    }
  }

}
