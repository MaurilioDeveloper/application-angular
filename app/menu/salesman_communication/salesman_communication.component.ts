import { AppService } from './../../app.service';
import { AppMessage } from './../../app.message';
import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'salesman_communication',
    templateUrl: './app/menu/salesman_communication/salesman_communication.component.html',
    styleUrls: ['./app/menu/salesman_communication/salesman_communication.component.css']
})
export class SalesmanCommunicationComponent implements OnInit {

    private socket: WebSocket;
    notificationList: string[] = [];
    notificationListTemp: string[] = [];

    @Input()
    public notificationHide: boolean;
    private notConnected: boolean = true;
    private currentColor: any;


    @ViewChildren('notification_row') notification_rows: QueryList<ElementRef>;

    public constructor(private appMessage: AppMessage, private appService: AppService) {
    }

    public ngOnInit() {

        this.socket = new WebSocket(this.appService.getURLWebsocket() + "/omega2-async-communication/salesman_communication/"
            + this.appService.getSessionUser().access_token
            + "/" + this.appService.getSessionUser().username);

        this.socket.onopen = event => {
            this.notConnected = false;
        }

        this.socket.onclose = event => {
            this.notConnected = true;
        }

        this.socket.onmessage = event => {
            this.notificationList = []
            this.notificationListTemp.push(event.data);
            let listSize = this.notificationListTemp.length;
            //inverte a ordem para o topo ser o 1º da lista
            for(let i = 0; i < listSize && i < 10 ; i++){
                this.notificationList.push(this.notificationListTemp[listSize-1-i]);
            }
            
            //metodo para noficar o usuario que ocorreu uma alteracao
            setTimeout(() => {
                this.rowNotify();
            }, 0);

        }

        this.socket.onerror = event => {
            console.log('WebSocket Connection Error');
            this.notConnected = true;
        }



    }


    public rowNotify() {
        if (this.notification_rows.toArray()[0]) {
            let row = this.notification_rows.toArray()[0].nativeElement;
            row.style.backgroundColor = '#BDBDBD';
            setTimeout(() => {
                row.style.backgroundColor = '';
            }, 2000);
        }
    }
} 
