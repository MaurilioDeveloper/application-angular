import { AppMessage } from './../app.message';
import { CommissionLevel } from './commission_level.interface';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { AppService } from './../app.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-commission',
    templateUrl: './app/commission_level/commission_level.component.html',
})
export class CommissionLevelComponent implements OnInit {

    public showDataTable: boolean;

    public request: CommissionLevel = { financeTypeId: null, saleTypeId: null, salesmanId: null, commissionId: null };

    public listPerson = [];
    public listSaletype = [];
    public listFinanceType = [];
    public listUserCommission = [];
    public listUserCommissionTemp = [];

    @ViewChild('table') table: any;

    public state = '';
    constructor(private appService: AppService, public media: ObservableMedia, private appMessage: AppMessage) {

        media.asObservable()
            .subscribe((change: MediaChange) => {
                this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ""
            });

    }

    ngOnInit() {
        this.showDataTable = false;
        this.loadSelect();
    }

    private loadSelect() {
        let observable = this.appService.xSearch('commissionLevelService', 'questCommissionLevelLoad');
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.listFinanceType.push(...response.listFinanceType);
                this.listPerson.push(...response.listPerson);
            },
            err => {
                console.log(err.json());
            }
        );
    }


    private loadSaleType() {
        
        if ((this.request.financeTypeId != null && this.request.financeTypeId != undefined)) {
            let observable = this.appService.xSearch('commissionLevelService/questUserSaleTypeByfinanceType', this.request.financeTypeId);
            observable.subscribe(
                (data) => {
                    let response = data.json();
                    this.listSaletype =response.listSaletype;
                    let exist = false;
                    this.listSaletype.forEach(saletype => {
                    if(saletype.id === this.request.saleTypeId){
                        exist = true; 
                    }
                    });
                    if(!exist){
                        this.request.saleTypeId = undefined;
                    }
                },
                err => {
                    console.log(err.json());
                }
            );
         }
    }


    public loadUserCommission() {
        this.loadSaleType();
        if ((this.request.financeTypeId != null && this.request.financeTypeId != undefined)
            && (this.request.saleTypeId != null && this.request.saleTypeId != undefined)) {
            let observable = this.appService.xSearchWithData('commissionLevelService/questCommissionLevelUser', this.request);
            observable.subscribe(
                (data) => {
                    let response = data.json();
                    this.listUserCommission=response.listUserCommission;
                    let exist = false;
                    this.listUserCommission.forEach(userCommission => {
                        if(userCommission.commisonId === this.request.commissionId){
                         exist = true; 
                        }
                     });
                     if(!exist){
                        this.request.commissionId = undefined;
                    }
                },
                err => {
                    console.log(err.json());
                }
            );
        } else {
          
            this.listUserCommission = [];
        }
    }

    public loadCommissionTemp() {
        if (this.request.salesmanId != null && this.request.salesmanId != undefined) {
            let observable = this.appService.xSearchWithData('commissionLevelService/questCommissionTempBySalesman', this.request);
            observable.subscribe(
                (data) => {
                    let response = data.json();
                    this.listUserCommissionTemp=response.listUserCommissionTemp;
                    this.showDataTable = true;
                },
                err => {
                    console.log(err.json());
                }
            );
        } else {
            this.listUserCommissionTemp = [];
            this.showDataTable = false;
        }
    }

    saveCommissionTemp() {
        if ((this.request.salesmanId != null && this.request.salesmanId != undefined)
            && (this.request.financeTypeId != null && this.request.financeTypeId != undefined)
            && (this.request.saleTypeId != null && this.request.saleTypeId != undefined)
            && (this.request.commissionId != null && this.request.commissionId != undefined)) {
            let observable = this.appService.xSearchWithData('commissionLevelService/saveCommissionTemp', this.request);
            observable.subscribe(
                (data) => {
                    this.appMessage.showSuccess("Liberação realizada com sucesso.");
                    this.loadCommissionTemp();
                },
                err => {
                    console.log(err.json());
                }
            );
        } else {
            this.listUserCommissionTemp = [];
            this.showDataTable = false;
        }
    }

    private cleanPage() {
        if (this.table) {
            this.table.offset = 0;
        }
    }

};
