import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OuterlayoutComponent } from './layout/outerlayout/outerlayout.component';
import { OuterContactComponent } from './layout/outerlayout/outer-contact/outer-contact.component';
import { FooterComponent } from './layout/outerlayout/footer/footer.component';
import { HeaderComponent } from './layout/outerlayout/header/header.component';
import { LoginFormComponent } from './layout/outerlayout/login-form/login-form.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { AdminHeaderComponent } from './layout/adminlayout/admin-header/admin-header.component';
import { AdminFooterComponent } from './layout/adminlayout/admin-footer/admin-footer.component';
import { AddComponent } from './admin/student/add/add.component';
import { ListComponent } from './admin/student/list/list.component';
import { UpdateComponent } from './admin/student/update/update.component';
import { HomeComponent } from './layout/adminlayout/home/home.component';
import { OuterHomeComponent } from './layout/outerlayout/outer-home/outer-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminheaderbarComponent } from './layout/adminlayout/adminheaderbar/adminheaderbar.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SingupFormComponent } from './layout/outerlayout/singup-form/singup-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { loginInterceptor } from './Interceptor/login.interceptor';
import { AboutComponent } from './layout/outerlayout/about/about.component';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';


@NgModule({
  declarations: [
    AppComponent,
    OuterlayoutComponent,
    OuterContactComponent,
    FooterComponent,
    HeaderComponent,
    LoginFormComponent,
    AdminlayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AddComponent,
    ListComponent,
    UpdateComponent,
    HomeComponent,
    OuterHomeComponent,
    AdminheaderbarComponent,
    SingupFormComponent,
    AboutComponent,
    UserlayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxCaptchaModule
    // MatSnackBarModule
    // SlickCarouselModule
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    provideToastr(),
   [ {
      provide: HTTP_INTERCEPTORS,
      useClass: loginInterceptor,
      multi: true
  }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
