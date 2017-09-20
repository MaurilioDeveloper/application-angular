import { AppMessage } from './../app.message';
import { AppService } from './../app.service';
import { RequestSubmissao } from './requestSubmissao.interface';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-submissao',
    templateUrl: './app/submissao/submissao.component.html'
})
export class SubmissaoComponent implements OnInit {

    private resultUser: boolean = false;
    private resultSubmitRole: boolean = false;

    private typeUpdadeSelect;
    private request:RequestSubmissao;


    typesUpdade = [
        { value: 1, viewValue: 'Usuário' },
        { value: 2, viewValue: 'Perfil' },
    ];

    listUser : Object[];
    listSubmitRole : Object[];
    listStructure : Object[] = [{structureId: null, description: 'Selecione uma Concessionária...'}];
    user : Object = { userId: null, regionalView: null };;

    constructor(private appService: AppService,private appMessage: AppMessage) { }

    ngOnInit() {
        let userSession = this.appService.getSessionUser();
        this.user = { userId: userSession.userId, regionalView: userSession.isRegionalView}
        this.request = { userId: userSession.userId, structureId: null, listSubmitRole: null, listUser: null };
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

    consultSubmitUser(){
        let observable = this.appService.xSearchWithData('submitDossierService/questSubmitUser', this.request);
        observable.subscribe(
            (data) => {
               let response = data.json();
               if(response.listUser != undefined){
                    this.listUser = response.listUser;
                    this.resultUser = true;
                    this.resultSubmitRole = false;
               }
            },
            err => {
               console.log(err.json());
            }
       );
    }

    saveSubmitUser(){
        this.request = { userId: this.request.userId, structureId: null, listSubmitRole: null, listUser: this.listUser };
        let observable = this.appService.xPost('submitDossierService/updateSubmitUser', this.request);
        observable.subscribe(
            (data) => {
                this.appMessage.showSuccess("msg-sucesso-save");
            },
            err => {
               console.log(err.json());
            }
       );
    }

    consultSubmitRole(){
        let observable = this.appService.xSearchWithData('submitDossierService/questSubmitRole', this.request);
        observable.subscribe(
            (data) => {
               let response = data.json();
               if(response.listSubmitRole != undefined){
                    this.listSubmitRole = response.listSubmitRole;
                    this.resultSubmitRole = true;
                    this.resultUser = false;
               }
            },
            err => {
               console.log(err.json());
            }
       );
    }

    saveSubmitRole(){
        this.request = { userId: this.request.userId, structureId: this.request.structureId, listSubmitRole: this.listSubmitRole, listUser: null };
        let observable = this.appService.xPost('submitDossierService/updateSubmitRole', this.request);
        observable.subscribe(
            (data) => {
                this.appMessage.showSuccess("msg-sucesso-save");
            },
            err => {
               console.log(err.json());
            }
       );
    }

};