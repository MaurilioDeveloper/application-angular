import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppMessage } from './../app.message';
import { ResetPassword } from './dto/reset_password.dto';
import { AppComponent } from './../app.component';
import { AppService } from './../app.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-reset-password',
    templateUrl: './app/reset_password/reset_password.component.html'
})
export class ResetPasswordComponent implements OnInit {

    reset: ResetPassword;
    msg: string;

    constructor(private appService: AppService, private app: AppComponent, private appMessage: AppMessage,
        private router: Router, private activatedRoute: ActivatedRoute) {
        this.reset = new ResetPassword();
        this.verifyToken();
    }

    ngOnInit() {
    }

    verifyToken() {

        this.activatedRoute.params.subscribe((params: Params) => {
            console.log(params);
            this.reset.idUser = params['idUser'];
            this.reset.token = params['token'];
            
        });

        if (this.reset.idUser && this.reset.token) {
            let tokenResponse = this.appService.xNoAuthPost('forgotPassword/verify', this.reset);
            tokenResponse.subscribe(
                (data) => {
                    let response = data.json();
                    console.log('objeto response');
                    console.log(response);
                    this.reset.idToken = response['idToken'];
                },
                err => {
                    console.log(err.json());
                    this.router.navigateByUrl('/login');
                }
            );
        } else {
            this.appMessage.showError("msg-invalid-token");
            this.router.navigateByUrl('/login');
        }
    }

    resetPassword() {
        let observable = this.appService.xNoAuthPost('forgotPassword/reset', this.reset);
        observable.subscribe(
            (data) => {
                this.router.navigateByUrl('/login');
                this.appMessage.showSuccess("msg-send-mail-success");
            },
            err => {
                console.log(err.json());
                this.reset.retryPassword = null;
            }
        );
    }
};