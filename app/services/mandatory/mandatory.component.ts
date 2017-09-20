import { AppMessage } from './../../app.message';
import { ServiceStructure } from './../serviceStructure.interface';

import { AppService } from './../../app.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'services-mandatory',
    templateUrl: './app/services/mandatory/mandatory.component.html'
})
export class MandatoryComponent implements OnInit {

    result: boolean;
    structureSelect;

    listStructure : Object[] = [{structureId: null, description: 'Selecione uma Concessionária...'}];
    listService : Object[];

    @ViewChild('table') table: any;

    constructor(private appService: AppService,private appMessage: AppMessage) { }

    ngOnInit() {
        this.loadStructure();
    }

    loadStructure(){
        let observable = this.appService.xSearch('structureService','questDealershipByUser' );
        observable.subscribe(
            (data) => {
               let response = data.json();
               this.listStructure.push(...response.listStructure);
            },
            err => {
               console.log(err.json());
            }
       );
    }

    consult(){
        let observable = this.appService.xSearch('serviceService/questServiceStructure', this.structureSelect);
        observable.subscribe(
            (data) => {
               let response = data.json();
               if(response.listService != undefined){
                    this.listService = response.listService;
                    this.result = true;
               }
            },
            err => {
               console.log(err.json());
            }
       );
    }

    save(){
        let requestService : ServiceStructure = {listServiceStructure: this.listService};
        let observable =this.appService.xPost('serviceStructureService/updateServiceRequered', requestService); 
       
        observable.subscribe(
            (data) => {
               this.appMessage.showSuccess("Configuração salva com sucesso.");
            },
            err => {
               console.log(err.json());
            }
        );
    }

    private cleanPage(){
        if(this.table){
            this.table.offset = 0;
        }
    }
};