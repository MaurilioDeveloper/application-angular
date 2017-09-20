import { HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Salesman } from './dto/salesman.dto';
import { AuthService } from './../../login/auth.service';
import { StructureSearch } from './dto/structure-search.dto';
import { AppService } from './../../app.service';
import { Component } from '@angular/core';
@Component({
    selector: 'selected-salesman-dialog',
    templateUrl: 'app/simulation/selected_salesman_dialog/selectedSalesman.dialog.html'

})
export class SelectedSalesmanDialog {
    showConsult: boolean = false;
    showContinue: boolean = false;
    isSalesmanSelected: boolean = false;
    listStructure = [];
    listSalesman: Object[];
    structureSearch: StructureSearch = new StructureSearch('', '');
    dealershipSelected = [];
    salesmanSelected;

    constructor(private appService: AppService, private authService: AuthService,
        public dialogRef: MdDialogRef<SelectedSalesmanDialog>) {

    }

    ngOnInit() {
        console.log("Entrou");
    }

    loadStructure() {
        let observable = this.appService.xSearchWithData('structureService/structurestoprofile', this.structureSearch);

        observable.subscribe(
            (data) => {
                let response = data.json();
                if (response.listStructure != undefined) {
                    this.listStructure = response.listStructure;
                    this.showConsult = true;
                } else {
                    this.showConsult = false;
                }
            },
            err => {
                console.log(err.json());
            }
        );
    }

    resetFields() {
        this.structureSearch = new StructureSearch('', '');
        this.listStructure = new Array();
        this.listSalesman = new Array<Object>();
        this.showConsult = false;
        this.isSalesmanSelected = false;
        this.showContinue = false;
        this.dealershipSelected = new Array();
    }

    loadSalesman() {
        this.listSalesman = new Array();
        let observable = this.appService.xSearch('simulation/salesmanlist', this.dealershipSelected[0].structureId);
        this.showContinue = true;
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.listSalesman = response.listSalesman;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    selectSalesman() {
        this.isSalesmanSelected = true;
    }

    continue() {
        this.authService.setSalesMan(new Salesman(this.salesmanSelected.id, this.salesmanSelected.name));
        this.dialogRef.close();
    }

    ngOnDestroy() {
        this.dialogRef.close();
    }

}