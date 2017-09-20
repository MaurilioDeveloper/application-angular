import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'email-renault',
    templateUrl: './app/forget_password/email-renault.component.html'
})
export class EmailRenaultComponent {
    private url: string;
    private splitUrls: any;

    constructor(private route: Router) {
    };

    ngOnInit() {
        this.splitUrls = this.route.url.split('/');
        this.url = "localhost:8021/#/" + this.splitUrls[1] + "/" + this.splitUrls[3] + "/" + this.splitUrls[2];
    }

};