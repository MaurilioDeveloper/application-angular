import { SimulationService } from './../../simulation.service';
import { CalculationComponent } from './calculation/calculation.component';

import { AppService } from './../../../app.service';
import { Simulation } from './../../dto/Simulation.dto';
import { Component, Input, OnInit, NgModule } from '@angular/core';
import { MdDialogRef } from '@angular/material';


@Component({
    selector: 'calculation-dialog',
    templateUrl: 'app/simulation/calculationPainel/calculationDialog/calculationDialog.dialog.html'
})

export class CalculationDialog implements OnInit {
    simulation: Simulation;

    calculationqta: Number;

    constructor(private appService: AppService, public dialogRef: MdDialogRef<CalculationDialog>,
        private simulationService: SimulationService) { }

    ngOnInit() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if (this.simulation) {
                this.onload();
            }
        });
    }

    private onload() {
    }

    close() {
    }

    contratado(evento) {
        this.dialogRef.close();
    }

    dados(listInstallments: Object[]) {

    }

}