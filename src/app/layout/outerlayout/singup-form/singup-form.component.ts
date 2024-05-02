
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { sha512 } from 'js-sha512';
// import { StudentsService } from '../../../services/students.service';

// @Component({
//     selector: 'app-singup-form',
//     templateUrl: './singup-form.component.html',
//     styleUrl: './singup-form.component.css'
//   })
//   export class SingupFormComponent implements OnInit {
//   registerform!: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private studentService: StudentsService,
//     private toastr: ToastrService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.registerform = this.formBuilder.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       confirmPassword: ['', Validators.required]
//     });
//   }

//   handleRegistration() {
//     if (this.registerform.invalid) {
//       this.toastr.error('Please fill all the required fields.');
//       return;
//     }

//     const username = this.registerform.get('username')?.value;
//     const email = this.registerform.get('email')?.value;
//     const password = sha512(this.registerform.get('password')?.value);
//     const confirmPassword = this.registerform.get('confirmPassword')?.value;
    

//     if (password !== sha512(confirmPassword)) {
//       this.toastr.error('Password and Confirm Password do not match.');
//       return;
//     }

//     const registrationData = {
//       username: username,
//       email: email,
//       password: password
//     };

//     this.studentService.register(registrationData).subscribe(
//       () => {
//         this.toastr.success('Registration successful!');
//         this.router.navigate(['/admin/student/list']); 
//       },
//       (error) => {
//         console.error('Error:', error);
//         this.toastr.error('An error occurred during registration. Please try again later.');
//       }
//     );
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { sha512 } from 'js-sha512';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'app-singup-form',
  templateUrl: './singup-form.component.html',
  styleUrls: ['./singup-form.component.css']
})
export class SingupFormComponent implements OnInit {
  registerform!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  handleRegistration() {
    if (this.registerform.invalid) {
      this.toastr.error('Please fill all the required fields.');
      return;
    }

    const username = this.registerform.get('username')?.value;
    const email = this.registerform.get('email')?.value;
    const password = sha512(this.registerform.get('password')?.value);
    const confirmPassword = this.registerform.get('confirmPassword')?.value;
    

    if (password !== sha512(confirmPassword)) {
      this.toastr.error('Password and Confirm Password do not match.');
      return;
    }

    const registrationData = {
      username: username,
      email: email,
      password: password
    };

    this.studentService.register(registrationData).subscribe(
      (response) => {
        const token = response.token;

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('token', token);

        this.toastr.success('Registration successful!');
        this.router.navigate(['/admin/student/list']); 
      },
      (error) => {
        console.error('Error:', error);
        this.toastr.error('An error occurred during registration. Please try again later.');
      }
    );
  }
}
