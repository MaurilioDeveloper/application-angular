import { AppMessage } from './../app.message';
import { Login } from './../login/login.interface';
import { AuthService } from './../login/auth.service';
import { ChangePaword } from './change_password.dto';
import { MdDialogRef } from '@angular/material';
import { AppService } from './../app.service';
import { AppComponent } from './../app.component';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';


@Component({
    selector: 'change-password',
    templateUrl: './app/change_password/change_password.component.html',
    providers: [AppComponent]
})
export class ChangePasswordComponent implements OnInit {

    password: ChangePaword;
    msg: string;
    supportedLangs: any[];

    constructor(private appService: AppService,
        public router: Router,
        private app: AppComponent,
        private authService: AuthService,
        private appMessage: AppMessage) { }



    ngOnInit() {
        this.password = new ChangePaword('', '', '');
        this.app.router = '/admin';
        console.log(this.app.router);

        this.supportedLangs = [
            { value: 'pt', img: 'assets/images/flagbr.png' },
            { value: 'fr', img: 'assets/images/flagfr.png' },
            { value: 'en', img: 'assets/images/flaguk.png' },
        ];

    }

    changePassword() {
        let observable = this.appService.xUpdate('securityService/changePassword', this.password);

        observable.subscribe(
            (data) => {

                let payload = data.json();
                this.msg = payload.msg;
                let login: Login;
                login = { user: '', password: '' }
                login.user = payload.userLogin;
                login.password = this.password.newPassword;
                this.authService.doLogout();
                this.authService.doLogin(login).subscribe((data2) => {
                    this.router.navigateByUrl('/home');
                    this.appMessage.showSuccess("msg-change-password-success");
                });
            },
            err => {
                console.log(err.json());
            }
        );
    }
}
