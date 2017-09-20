import { AppComponent } from './../../app.component';
import { Notice } from './dto/notice.dto';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-notice-list',
    template: `
        <ul *ngIf='notices'>
          <li *ngFor="let nots of notices" class="newsli" [routerLink]="['/notice', nots.id]"> 
          <div class="news"> <div class="newscircle">&nbsp;</div> <span class="spannews">{{nots.dtInsert | datex }} - {{nots.title}}</span></div>
          </li>      
        </ul>
    `
})
export class NoticeListComponent {
    notices: Array<Notice>
    idFinancialBrand: number;

    constructor(
        private appService: AppService,
        private router: Router,
        private app: AppComponent
    ) { };

    ngOnInit() {
        switch (this.app.theme) {
            case 'nissan':
                this.idFinancialBrand = 2;
                break;
            case 'renault':
                this.idFinancialBrand = 1;
                break;
            case 'rci':
                this.idFinancialBrand = 5;
            default:
                break;
        }

        let notices = this.appService.xSearch("noticeService/noticelist", this.idFinancialBrand);
        notices.subscribe(
            (data) => {
                let response = data.json();
                this.notices = this.getNotices(response.listNotices);
            },
            err => {
                console.log(err.json());
            }
        );
    }

    getNotices(listNotices: Array<object>) {
        let listnotice: Array<Notice> = new Array();
        for (var i = 0; i < listNotices.length; i++) {
            let result = listNotices[i];
            let notice = new Notice(result['id'], result['title'], result['date'], '');
            listnotice.push(notice);
        }
        return listnotice;
    }

    onSelect() {
        this.router.navigateByUrl('/notice');
    }

};