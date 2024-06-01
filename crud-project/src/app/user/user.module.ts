import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {BaseComponent} from "./base/base.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'register', component: RegisterComponent },
    ]

  }
]

@NgModule({
  declarations: [
    BaseComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class UserModule {
}
