import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './app/footer/footer.component.html'
})
export class FooterComponent implements OnInit {

    theme: string;

    constructor(private appComponent: AppComponent) { 
    }

    ngOnInit() {
        this.theme = this.appComponent.theme;
    }


}