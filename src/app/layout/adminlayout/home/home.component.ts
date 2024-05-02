import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
  studentCount: number = 0;

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    this.fetchStudentCount();
  }

  fetchStudentCount() {
    this.studentService.getStudents().subscribe((students: any[]) => {
      this.studentCount = students.length;
    });
  }
}
