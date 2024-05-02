
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentsService } from '../../../services/students.service';
import { sha512 } from 'js-sha512';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  captchaFormGroup!: FormGroup;
  siteKey = '6LdFs7gpAAAAAE9mGnPHHgPEDEDEOLd2nKesMfee';

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentsService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storageService: StorageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  



  const storedUsername = this.storageService.get('username');
    const storedPassword = this.storageService.get('password');
    if (storedUsername && storedPassword) {
      this.loginForm.patchValue({
        username: storedUsername,
        password: storedPassword
      });
    }
    window.onbeforeunload = () => {
      this.storageService.clear();
    };
  }


  handleLogin() {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill all the required fields.');
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = sha512(this.loginForm.get('password')?.value);
    const recaptchaToken = this.loginForm.get('recaptcha')?.value;

    const formData = {
      "username": username,
      "password": password,
      "captchaToken": recaptchaToken
    };

    this.studentService.login(formData).subscribe(
      loginResponse => {
        if (loginResponse && loginResponse.token) { 
          this.toastr.success('Login successful!');
          this.storageService.set('username', username);
          this.storageService.set('password', password);
          localStorage.setItem('token', loginResponse.token); 
          this.router.navigate(['/admin/student/list']);
        } else {
          this.toastr.error('Invalid username or password.');
        }
      },
      error => {
        console.error('Error:', error);
        this.toastr.error('An error occurred while logging in. Please try again later.');
      }
    );
  }

  userlogin(){
    this.router.navigate(['/userlayout']);
  }

}




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { StudentsService } from '../../../services/students.service';
// import { sha512 } from 'js-sha512';

// @Component({
//   selector: 'app-login-form',
//   templateUrl: './login-form.component.html',
//   styleUrls: ['./login-form.component.css']
// })
// export class LoginFormComponent implements OnInit {

//   loginForm!: FormGroup;
//   captchaFormGroup!: FormGroup;
//    siteKey = '6LdFs7gpAAAAAE9mGnPHHgPEDEDEOLd2nKesMfee';

//   constructor(
//     private formBuilder: FormBuilder,
//     private studentService: StudentsService,
//     private toastr: ToastrService,
//     private router: Router
//   ) { }

//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//       recaptcha: ['', Validators.required]
//     });
//   }

//   handleLogin() {
//     if (this.loginForm.invalid) {
//       this.toastr.error('Please fill all the required fields.');
//       return;
//     }

//     const username = this.loginForm.get('username')?.value;
//     const password = sha512(this.loginForm.get('password')?.value);
//     const recaptchaToken = this.loginForm.get('recaptcha')?.value;

//     const formData = {
//       "username": username,
//       "password": password,
//       "captchaToken": recaptchaToken
//     };

//     this.studentService.login(formData).subscribe(
//       loginResponse => {
//         if (loginResponse && loginResponse.token) {
//           this.toastr.success('Login successful!');
//           localStorage.setItem('token', loginResponse.token);
//           this.router.navigate(['/admin/student/list']);
//         } else {
//           this.toastr.error('Invalid username or password.');
//         }
//       },
//       error => {
//         console.error('Error:', error);
//         this.toastr.error('An error occurred while logging in. Please try again later.');
//       }
//     );
//   }

//   handleLogout() {
//     localStorage.removeItem('token');
//     this.router.navigate(['/login']);
//   }

// }

