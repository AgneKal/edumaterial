import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Lecture } from '../models/lecture';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {
  lecture: any;

  constructor(private http: HttpClient, public authServices: AuthService) { }


  public getLectures(id: number | null = null) {
    return this.http.get<Lecture[]>(`http://localhost:1212/lectures/${id ? `?group_id=${id}`: ''}`)
  }

  public getLecture(id: number){
    return this.http.get<Lecture>('http://localhost:1212/lectures/'+id);
  }
  
  public addLecture(lecture: Lecture) {
    const formData:any = new FormData();
    formData.append('title', lecture.title!);
    formData.append('lecture_date', lecture.lecture_date);
    formData.append('description', lecture.description!);
    if (lecture.group_id) formData.append('group_id', lecture.group_id);
    for (var i = 0; i < lecture.files.length; i++) { 
      formData.append('files', lecture.files[i]);
    }
    return this.http.post<Lecture>('http://localhost:1212/lectures', formData);
  }
  
  public updateLecture(lecture: Lecture){
    const formData:any = new FormData();
    formData.append('id', lecture.id);
    formData.append('title', lecture.title!);
    formData.append('lecture_date', lecture.lecture_date);
    formData.append('description', lecture.description!);
    if (lecture.group_id) formData.append('group_id', lecture.group_id);
    for (var i = 0; i < lecture.files.length; i++) { 
      formData.append('files', lecture.files[i]);
    }
    return this.http.put<Lecture>('http://localhost:1212/lectures/'+lecture.id, formData);
  }

  public toggleFileVisibility(fileId: number, visibility: boolean){
    return this.http.patch('http://localhost:1212/lectures/files/'+fileId, {visibility: visibility});
  }

  public deleteLecture(id: number){
    return this.http.delete('http://localhost:1212/lectures/'+id);
  }

  public deleteFile(id: number) {
    return this.http.delete('http://localhost:1212/lectures/files/'+id);
  }
}
