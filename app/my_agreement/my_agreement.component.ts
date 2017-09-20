import { CustomDateAdapter } from './custom-date.adapter';
import { MyAgreement } from './my_agreement.interface';
import { StructureMyAgreement } from './structureMyAgreement.interface';
import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { AppService } from './../app.service';
import {ObservableMedia,MediaChange} from '@angular/flex-layout';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'my-agreement',
  templateUrl: './app/my_agreement/my_agreement.component.html'
})
export class MyAgreementComponent implements OnInit{

    structure:StructureMyAgreement;
    filter: MyAgreement;
    showConsult: boolean = false;
    
    listPersonType = [];
    listDossierStatus : Object[] =  [{dossierStatusId: null, description: 'Selecionar um status...'}];
    listStructure : Object[] = [{structureId: null, description: 'Selecionar uma concessionária...'}];
    listSalesman : Object[] = [{dossierStatusId: null, name: 'Selecionar um vendedor...'}];
    listSaleType : Object[] = [{saleTypeId: null, description: 'Selecionar um tipo de venda...'}];

    listDossiers = [];
    public state = '';

    @ViewChild('table') table: any;

    constructor(public appService: AppService,public media:ObservableMedia ) { 
       

    media.asObservable()
      .subscribe((change:MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ""
      });
  
    }
    

    ngOnInit() {
        let userSession = this.appService.getSessionUser();
        this.loadSelect();
        this.loadForm();
    };

    private loadForm(){
            this.filter = {idDossier: null,
                           adp :null,
                           typePerson:null,
                           cpfCnpj:null,
                           nameClient:null,
                           proposedStatus:null,
                           dateCreationInit: null,
                           dateCreationEnd:null,
                           dateExpirationInit:null,
                           dateExpirationEnd:null,
                           salesman:null,
                           dealership:null,
                           saleTypeId:null,
                           taxTc:false };
                           
    }
  
    private loadSelect(){
        let observable = this.appService.xSearch('myAgreementService','myAgreementSelect');

       observable.subscribe(
            (data) => {
               let response = data.json();
               this.listDossierStatus.push(...response.listDossierStatus);
               this.listStructure.push(...response.listStructure);
               this.listSaleType.push(...response.listSaleType);
               this.listPersonType = (response.listPersonType);
            },
            err => {
               console.log(err.json());
            }
       );
    }

    public loadSalesman(structureSelected){
        this.structure = { structureId: structureSelected};
        let observable = this.appService.xSearchWithData('personService/questSalesmanDealership', this.structure );

        observable.subscribe(
                (data) => {
                     let response = data.json();
                     this.listSalesman = [{dossierStatusId: null, name: 'Selecionar um vendedor...'}];
                     this.listSalesman.push(...response.listPerson);
                },
                err => {
                console.log(err.json());
                }
        );    
    }

    public clearMyAgreement(){
        this.loadForm();
    }

    public consult(filter:MyAgreement){
        let observable = this.appService.xSearchWithData('dossierService/myDossier', filter );
        observable.subscribe(
                (data) => {
                     let response = data.json();
                     if (response.listDossiers != undefined) {
                        this.listDossiers = response.listDossiers;
                        this.showConsult = true;
                        this.cleanPage();
                     } else {
                        this.showConsult = false;
                     }
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
}