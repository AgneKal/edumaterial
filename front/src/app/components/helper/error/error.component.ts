import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  @Input()
  public isError: boolean = false;

  @Input()
  public text: String = '';

  public onCloseError(){
    this.isError = false;
  }
}