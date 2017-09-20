import { Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SalesmanCommunicationComponent } from './salesman_communication/salesman_communication.component';
import { TranslateService } from './../translate/translate.service';
import { MdDialog } from '@angular/material';
import { AppService } from './../app.service';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../login/auth.service';
import { AppMessage } from './../app.message';
import { Router, NavigationExtras } from '@angular/router';

import { MyProfileComponent } from './profile/my_profile.dialog';



@Component({
    selector: 'app-menu',
    templateUrl: './app/menu/menu.component.html',
})
export class MenuComponent{

    public brands: Array<string>;
    public click: number = 0;
    private theme: string;
    private msgCurrentUser: string;

    public notificationHide : boolean;

    constructor(public app: AppComponent,
        public router: Router,
        public authService: AuthService,
        private appMessage: AppMessage,
        public appService: AppService,
        public dialog: MdDialog,
        private _translate: TranslateService) {

        this.notificationHide = false;

        this.brands = [this.app.BRAND_RENAULT, this.app.BRAND_NISSAN, this.app.BRAND_RCI];
        this.buidMsgCurrentUser();    
    }

    buidMsgCurrentUser(){
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser){
            let welcome = this._translate.instant('lb-welcome');
            this.msgCurrentUser = welcome+' <b>'+currentUser['name']+'</b>';
        }
    }

   
    dialogPerfil() {
        let dialogRef = this.dialog.open(MyProfileComponent, { width: '50%' });
    }

    notificationClick(){
        this.notificationHide = !this.notificationHide;
    }
    
}