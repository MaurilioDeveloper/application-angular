import { Installment } from './../../../../dto/Installment.dto';
import { MdDialogRef } from '@angular/material';
import { AppService } from './../../../../../app.service';
import { Simulation } from './../../../../dto/Simulation.dto';

import { Component, Input, OnInit, NgModule } from '@angular/core';

@Component({
    selector: 'services-dialog',
    templateUrl: 'app/simulation/calculationPainel/calculationDialog/calculation/installmentsDialog/installments.dialog.html'
})

export class InstallmentsDialog implements OnInit {
    simulation: Simulation;
    
    ngOnInit() {
    }

    constructor(private appService: AppService, public dialogRef: MdDialogRef<InstallmentsDialog>) {

    }



}