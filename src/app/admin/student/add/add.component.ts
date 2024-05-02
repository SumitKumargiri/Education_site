
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  [x: string]: any;
  formData = {
    id: null,
    name: '',
    email: '',
    city_name: '',
    mobno: '',
    gender: ''
  };
  successMessageVisible: boolean | undefined;
  errorMessageVisible: boolean | undefined;

  constructor(private http: HttpClient, private router:Router,private toastr: ToastrService) { }

  onSubmit(): void {
    this.http.post<any>('https://localhost:7166/api/Admin', this.formData)
      .subscribe(
        response => {
          console.log('Data added successfully:', response);
          // this.successMessageVisible = true;
          this.toastr.success('Data added successfully');
          this.successMessageVisible = true;
          setTimeout(() => {
            this.successMessageVisible = false;
          }, 3000);
          this.router.navigate(['/admin/student/list']);
          // Reset form after successful submission if needed
          this.resetForm();
        },
        error => {
          console.error('Error adding data:', error);
          // this.errorMessageVisible = true;
          this.toastr.error('Error adding data');
          this.errorMessageVisible = true;
          setTimeout(() => {
            this.errorMessageVisible = false;
          }, 3000);
        }
      );
  }


  // onCancel(): void {
  //   this.resetForm();
  // }

  resetForm(): void {
    this.formData = {
      id: null,
      name: '',
      email: '',
      city_name: '',
      mobno: '',
      gender: ''
    };
  }



  clearForm(){
    this.formData ={
      id: null,
      name: '',
      email: '',
      city_name: '',
      mobno: '',
      gender: ''
    };
  }
}



