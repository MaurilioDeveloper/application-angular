import { FlexLayoutModule }     from '@angular/flex-layout';
import { FormsModule }          from '@angular/forms';
import { MaterialModule }       from '@angular/material';
import { TranslateModule }      from './../translate/translate.module';
import { TranslatePipe }        from './../translate/translate.pipe';
import { ForgotPasswordDialog } from './../forgot_password_dialog/forgot_password.dialog';
import { AuthDeniedComponent }  from './auth-denied';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from './auth-guard.service';
import { AuthService }          from './auth.service';
import { LoginComponent }       from './login.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/:brand', component: LoginComponent },
  { path: 'denied', component: AuthDeniedComponent },
  { path: '', component: LoginComponent, pathMatch: 'full' }, // redirect to home page on load
];

export const LoginRoutes = {
    //  routes: RouterModule.forRoot(appRoutes),
      components: [ 
           LoginComponent,
           AuthDeniedComponent
      ]
    };

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes), TranslateModule, MaterialModule,  
                  FormsModule, FlexLayoutModule
  ],
  exports: [
    RouterModule  
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  declarations: [
    ForgotPasswordDialog
  ],
  bootstrap:[
    ForgotPasswordDialog
  ]
})
export class LoginModule {}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/