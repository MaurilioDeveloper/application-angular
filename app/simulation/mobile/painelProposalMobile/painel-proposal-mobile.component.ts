import { SimulationService } from './../../simulation.service';
import { AppService } from './../../../app.service';
import { Simulation } from './../../dto/Simulation.dto';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
    selector: 'painel-proposal-mobile',
    templateUrl: 'app/simulation/mobile/painelProposalMobile/painel-proposal-mobile.component.html',
    styleUrls: ['app/simulation/painelProposal/tc-select-dialog.scss']
})
export class PainelProposalMobileComponent implements OnInit {

    simulation: Simulation;
    person: String;
    exempt: String;
    cpfCnpj: String;


    constructor(private appService: AppService, public dialog: MdDialog, private simulationService: SimulationService) { }

 
    ngOnInit() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
			this.onload(simulation);
        }); 
    }

    private onload(simulation: Simulation){
        this.simulation = simulation;
        
        let cpfCnpj = this.simulation.client.cpfCnpj;
		if (cpfCnpj.length == 14) {
			this.cpfCnpj = "CNPJ";
		} else if (cpfCnpj.length == 11) {
            this.cpfCnpj = "CPF";
		}

        if (this.simulation.client.typePerson == "PF") {
            this.person = 'Pessoa Jurídica';
        } else {
            this.person = 'Pessoa Física';
        }
        
        if (this.simulation.tc) {
            this.exempt = 'Isento';
        } else {
            this.exempt = 'Não Isento';
        }
}



    openDialog() {
        let dialogRef = this.dialog.open(SelectTcDialog);
        dialogRef.componentInstance.tc = this.simulation.tc;
        dialogRef.afterClosed().subscribe(result => {
            this.simulation.tc = dialogRef.componentInstance.tc;
            if (this.simulation.tc) {
                this.exempt = 'Isento';
            } else {
                this.exempt = 'Não Isento';
            }
        });

    }



}

@Component({
    selector: 'opem-tc-dialog',
    templateUrl: 'app/simulation/painelProposal/tc-select-dialog.html'
})
export class SelectTcDialog {
    tc: boolean;
    constructor(public dialogRef: MdDialogRef<SelectTcDialog>) { }

    ngOnInit() {
        this.tc = this.dialogRef.componentInstance.tc;
    }

    changeTc(tClient: boolean) {
        this.dialogRef.componentInstance.tc = tClient;
        this.tc = tClient;
    }

}


