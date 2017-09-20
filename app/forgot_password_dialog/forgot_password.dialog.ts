import { AppMessage } from './../app.message';
import { AppComponent } from './../app.component';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AppService } from './../app.service';
import { ForgotPassword } from './dto/forgot_password.dto';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MaterialModule, MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './app/forgot_password_dialog/forgot_password.dialog.html'
})

export class ForgotPasswordDialog implements OnInit {
    forgotPassword: ForgotPassword;

    constructor(private appService:AppService, private appMessage : AppMessage,
    private dialogRef:MdDialogRef<ForgotPasswordDialog>, private route:Router, private app:AppComponent) {
    }

    ngOnInit() {
        this.forgotPassword = new ForgotPassword();
        this.forgotPassword.path = document.location.origin;
        this.forgotPassword.theme = this.app.overlayContainer.themeClass;
        // console.log(this.app.overlayContainer.themeClass);
    }

    requestToken(){
        let result = this.appService.xNoAuthPost('forgotPassword/request', this.forgotPassword);
        console.log(this.forgotPassword);
        result.subscribe(
            (data) => {
                this.appMessage.showSuccess('msg-send-mail-success');
            },err => {
                console.log(err.json());
            }
        )
        this.dialogRef.close();
    }
}