import { AppComponent } from './../../app.component';
import { ActivatedRoute, Params } from '@angular/router';
import { AppService } from './../../app.service';
import { Notice } from './dto/notice.dto';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-notice',
    templateUrl: './app/home/notice/notice.component.html'
})

export class NoticeComponent {
    notice: Notice;
    id: string;


    constructor(private appService: AppService, private activatedRoute: ActivatedRoute) {
        this.notice = new Notice('', '', '',''); this.activatedRoute.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
        this.getNotice();
    }

    getNotice() {   
        let notices = this.appService.xSearch("noticeService/notice", this.id);
        notices.subscribe(
            (data) => {
                let response = data.json();
                this.notice = response.notice;
            },
            err => {
                console.log(err.json());
            }
        );
    }
};