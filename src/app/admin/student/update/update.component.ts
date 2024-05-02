import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  formData = {
    id:null,
    name: '',
    email: '',
    city_name: '',
    mobno: '',
    gender: ''
  };
  successMessageVisible: boolean | undefined;
  errorMessageVisible: boolean | undefined;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router) {
    this.route.params.subscribe(params => {
      this.formData.id = params['id']; 
    });
  }

  onSubmit(): void {
    this.http.put<any>('https://localhost:7166/api/Admin/'+ this.formData.id, this.formData)
      .subscribe(
        response => {
          console.log('Data updated successfully:', response);
          this.successMessageVisible = true;
          setTimeout(() => {
            this.successMessageVisible = false;
          }, 3000);
          this.resetForm();
          this.router.navigate(['/admin/student/list']);
        },
        error => {
          console.error('Error updating data:', error);
        }
      );
  }

  cancelUpdate(): void {
    // Implement cancel update logic, e.g., navigate back to list
  }
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
}






