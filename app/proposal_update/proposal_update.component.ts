import { AppService } from './../app.service';
import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'proposal-update',
    templateUrl: './app/proposal_update/proposal_update.component.html'
})
export class ProposalUpdateComponent implements OnInit {

    paramDto: Object = {paramBoolean:true};
    paramList: Object[] = [{value : true, valueView : "Sempre apresentar o botão ATUALIZAR (para propostas enviadas para análise de crédito)"},
                            {value : false, valueView : "Apresentar o botão ATUALIZAR somente quando o webservice retornar erro na chamada ao método de atualização"}];

    constructor(private appService: AppService){
    };

    ngOnInit() {
        let observable = this.appService.xSearch('paramProposalUpdateService','findParamProposalUpdate' );
        observable.subscribe(
            (data) => {
               let response = data.json();
               this.paramDto = response.paramDto;
            },
            err => {
               console.log(err.json());
            }
       );
    }

    save(){
        let observable = this.appService.xPost('paramProposalUpdateService/saveParamProposalUpdate',this.paramDto);
        observable.subscribe(
            (data) => {
               let response = data.json();
               this.paramDto = response.paramDto;
            },
            err => {
               console.log(err.json());
            }
       );
    }
};