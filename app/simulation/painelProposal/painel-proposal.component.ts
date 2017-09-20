import { TypePerson } from './../dto/Client.dto';
import { SimulationService } from './../simulation.service';
import { Calculation } from './../dto/Calculation.dto';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AppService } from './../../app.service';
import { Simulation } from './../dto/Simulation.dto';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
    selector: 'painel-proposal',
    templateUrl: 'app/simulation/painelProposal/painel-proposal.component.html',
    styleUrls: ['app/simulation/painelProposal/tc-select-dialog.scss']
})
export class PainelProposalComponent implements OnInit {

    simulation: Simulation;
    @Input() steep;
    person: String;
    exempt: String;
    cpfCnpj: String;

    constructor(private appService: AppService, public dialog: MdDialog, 
                            private simulationService: SimulationService) { }

    ngOnInit() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
			this.simulation = simulation;
            if(this.simulation){
			    this.onload();
            }
        }); 
    }

    private onload(){
        if (this.simulation.client.typePerson === TypePerson.PF) {
            this.person = 'Pessoa Física';
            this.cpfCnpj = "CPF";
        } else {
            this.person = 'Pessoa Jurídica';
            this.cpfCnpj = "CNPJ";
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


@Component({
    selector: 'painel-proposal-two',
    templateUrl: 'app/simulation/painelProposal/painel-proposal-two.component.html'
})
export class PainelProposalTwoComponent {


    simulation: Simulation;

    constructor(private simulationService: SimulationService) { }

    ngOnInit() {
       this.simulationService.load.subscribe(( simulation: Simulation ) => {
			this.simulation = simulation;
            if(this.simulation){
                this.onload();
            }
       }); 

    }
    
    private onload(){
    }
}
