import { Notification } from './notifications.dto';
import { AppMessage } from './../app.message';
import { AppService } from './../app.service';
import { Router } from '@angular/router';
import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
    selector: 'notifications',
    templateUrl: './app/notifications/notifications.component.html'
})
export class NotificationComponent {
    notifications: Object[];
    read: boolean;
    private currentColor: any;
    @ViewChildren('datatableTeaching') notification_rows: QueryList<QueryList<ElementRef>>;
    @ViewChild('datatableTeaching') table;

    listNotifications: Object[];
    private notification: Notification

    constructor(private appService: AppService, private appMessage: AppMessage) {
    };

    ngOnInit() {
        this.notification = new Notification();
        this.listNotification();
    }

    public changeRead(event, index) {
        this.read === true ? false : true;
        this.notification.read = event.checked;
        this.notification.id = index.id;
        this.notification.idUser = <number>index.userId;
        let requestNotification = this.notification;
        let observable = this.appService.xUpdate('notificationService/updateNotification', requestNotification);

        observable.subscribe(
            (data) => {
                let response = data.json();
                this.updateNotifications(response.listNotifications);
            },
            err => {
                console.log(err.json());
                this.notification.read = !event.checked;
            }
        );

    }


    changeReadClick(event, obj) {
        this.notification.read = true;
        this.notification.id = obj.id;
        this.notification.idUser = <number>obj.userId;
        let requestNotification = this.notification;
        let observable = this.appService.xUpdate('notificationService/updateNotification', requestNotification);

        observable.subscribe(
            (data) => {
                let response = data.json();
                this.updateNotifications(response.listNotifications);
            },
            err => {
                console.log(err.json());
                this.notification.read = false;
            }
        );
    }



    rowClass = (row) => {
        if (row.read == 1) {
            return {
                'paintLine': row.read == 1
            };
        }
    }



    getCellClass({ row, column, value }) {
        if (row.read == 1) {
            return {
                'paintLine': row.read == 1
            };
        }
    }

    listNotification() {
        let observable = this.appService.xSearch('notificationService', 'notificationlist');
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.updateNotifications(response.listNotifications);
            },
            err => {
                console.log(err.json());
            }
        );
    }


    updateNotifications(list: Object[]) {
        if (list != undefined) {
            this.listNotifications = list;
        }
    }

};