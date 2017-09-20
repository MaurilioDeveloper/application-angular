import { MdDialogRef } from '@angular/material';
import { AppService } from './../../app.service';
import { AppComponent } from './../../app.component';
import { IUser } from './my_profile.interface';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../login/auth.service';
import { AppMessage } from '../../app.message';
import { Router, NavigationExtras } from '@angular/router';


@Component({
    selector: 'app-profile',
    templateUrl: './app/menu/profile/my_profile.dialog.html',
    providers: [AppComponent]
})
export class MyProfileComponent implements OnInit {

    msg: string;
    supportedLangs: any[];
    
    windows = [
        {value: 1, viewValue: '1'},
        {value: 2, viewValue: '2'},
        {value: 3, viewValue: '3'}
    ];

    windowSelected:number = 1;

    constructor( private appService: AppService, 
                 public authService: AuthService,
                 private appMessage: AppMessage,
                 public router: Router,
                 private app: AppComponent,
                 private dialogRef:MdDialogRef<MyProfileComponent>) { }

    ngOnInit() {
        this.app.router = '/admin';

        this.supportedLangs = [
            { value: 'pt', img: 'assets/images/flagbr.png'  },
            { value: 'fr', img: 'assets/images/flagfr.png'	},
            { value: 'en', img: 'assets/images/flaguk.png'	},
        ];
        this.getProposalQuantity();

    }
    
    //TODO EMIT @OUTPUT app_component_selectLang
    selectLang(lang: string) {
        // set default;
        return this.app.selectLang(lang);
    }

    doLogout() {
        this.authService.doLogout().subscribe(() => {
            if (!this.authService.isLoggedIn) {
                this.appMessage.showSuccess("Usuário deslogado com sucesso");
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = '/login';
                // Redirect the user
                this.router.navigate([redirect]);
            }
        });
        console.log("concluido logout");
        this.dialogRef.close();
    }

    resetPassword(user: IUser) {
        //this.slimLoader.start(); 
        // console.log(user);
        let observable = this.appService.xUpdate('/noauth/forgotPassword/reset/', user);

        observable.subscribe(
            (data) => {

                let payload = data.json();
                console.log(data.json());
                this.msg = payload.msg;

            },
            err => {
                console.log(err.json());
            }
        );
    }

    isShowReset(){
        return this.appService.hasRole('ADMINISTRADOR');  
    }

    changePassword(){
        this.dialogRef.close();
        this.router.navigateByUrl('/change_password');
    }

    getProposalQuantity(){
        let observable = this.appService.xSearch('userProfile', 'proposalquantity');
        observable.subscribe(
            (data) => {
                let response = data.json();           
                this.windowSelected = response.proposalQuantity;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    saveProposalQuantity(){
        let quantity:Object = {'proposalQuantity':this.windowSelected};
        let observable = this.appService.xUpdate('userProfile/saveproposalquantity', quantity);

        observable.subscribe(
            (data) => {

            },
            err => {
                console.log(err.json());
            }
        );
    }

};