import { OnInit } from '@angular/core';
import { AppMessage } from './../app.message';
import { AppService } from './../app.service';
import { Component} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './app/home/home.component.html'
})
export class HomeComponent implements OnInit{
    
    public file:Object;

    constructor(private appService: AppService){
    };    

    ngOnInit() {
        this.loadImageFinancialBrand();
    }

    loadImageFinancialBrand(){
        let observable = this.appService.xSearch('financialBrandService','findImageFinancialBrandByUser');
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.file = response.file;
            }, 
            err => {
                console.log(err.json());
            }
        );
    }
};