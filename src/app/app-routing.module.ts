import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OuterContactComponent } from './layout/outerlayout/outer-contact/outer-contact.component';
import { LoginFormComponent } from './layout/outerlayout/login-form/login-form.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { OuterlayoutComponent } from './layout/outerlayout/outerlayout.component';
import { OuterHomeComponent } from './layout/outerlayout/outer-home/outer-home.component';
import { HomeComponent } from './layout/adminlayout/home/home.component';
import { AddComponent } from './admin/student/add/add.component';
import { UpdateComponent } from './admin/student/update/update.component';
import { ListComponent } from './admin/student/list/list.component';
import { SingupFormComponent } from './layout/outerlayout/singup-form/singup-form.component';
import { AboutComponent } from './layout/outerlayout/about/about.component';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';


const routes: Routes = [
// +++++++++++ Admin page +++++++++++++
  { 
    path: 'admin',
    component: AdminlayoutComponent, 
    children: [
      // { path: 'profile', component: , outlet: 'sidebar' },
      { path: 'home', component: HomeComponent },
      { path: 'student/add', component: AddComponent },
      { path: 'student/update/:id', component: UpdateComponent },
      { path: 'student/list', component: ListComponent },
      { path: '', redirectTo: 'home', pathMatch:'full' }
    ]
},
  // +++++++++++ outer page/Home page +++++++++++++++++++
  { 
    path: '',
    component: OuterlayoutComponent, 
    children: [
      {path:'outer-home', component:OuterHomeComponent},
      {path:'outer-contact', component:OuterContactComponent},
      {path:'about', component:AboutComponent},
      {path:'login-form', component:LoginFormComponent},
      {path:'userlayout', component:UserlayoutComponent},
      {path:'singup-form', component:SingupFormComponent},
      { path: '', redirectTo: 'outer-home', pathMatch:'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
