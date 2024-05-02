import { Component, OnInit, inject } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { Student } from '../../../types/student';
import { StudentsService } from '../../../services/students.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{


  students: Student[] = [];
  isLoading: boolean = true; 
  errorMessage: string | null=null;
  searchId: string = '';

  
  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  constructor(private studentService: StudentsService, private router: Router,private toastr: ToastrService) {}


  ngOnInit(): void {
    // this.fetchStudents();
    timer(3000).subscribe(() => {
      this.isLoading = false; 
      this.fetchStudents(); 
  });
  }


  fetchStudents(): void {
    this.studentService.getStudents().subscribe(
      response => {
        this.students = response.lstModel;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.error('Unauthorized. Please log in again.');
        } else {
          console.error('Error fetching students:', error);
          this.toastr.error('An error occurred while fetching students');
        }
        this.isLoading = false;
      }
    );
  }


  searchStudentById(): void {
    const studentId = parseInt(this.searchId, 10);

    if (isNaN(studentId)) {
      this.toastr.error('Invalid student ID: ' + this.searchId);
      return;
    }

    const foundStudent = this.students.find(student => student.id === studentId);

    if (foundStudent) {
      this.students = [foundStudent]; 
      this.errorMessage = '';
    } else {
      this.toastr.error('Student not found');
      this.errorMessage = 'Student not found';
    }
    this.searchId = '';
  }


  deleteStudent(studentId: number): void {
    this.studentService.deleteStudent(studentId)
      .subscribe(
        () => {
          this.toastr.success('Student deleted successfully');
          this.students = this.students.filter(student => student.id !== studentId);
        },
        (error) => {
          console.error('Error deleting student:', error);
          this.toastr.error('An error occurred while deleting the student');
        }
      );
  }
}
  

