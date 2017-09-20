import { CustomerCardService } from './../customer-card.service';
import { AppMessage } from './../../../app.message';
import { AppService } from './../../../app.service';
import { AppComponent } from './../../../app.component';
import { MdDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';


@Component({
    selector: 'send_simulation_component',
    templateUrl: './app/simulation/customer_card/send_simulation_dialog/send_simulation.dialog.html',
    providers: [CustomerCardService]
})
export class SendSimulationDialog implements OnInit {


    constructor( public dialogRef: MdDialogRef<SendSimulationDialog> ) { }

    ngOnInit() {
      
    }

    
    
};