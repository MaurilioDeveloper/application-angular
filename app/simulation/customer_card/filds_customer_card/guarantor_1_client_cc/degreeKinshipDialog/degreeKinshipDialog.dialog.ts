import { Simulation } from './../../../../dto/Simulation.dto';
import { MdDialogRef } from '@angular/material';
import { AppService } from './../../../../../app.service';
import { Component, OnInit, Input } from '@angular/core';



@Component({
    selector: 'degree-Kinship-Dialog',
    templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_client_cc/degreeKinshipDialog/degreeKinshipDialog.dialog.html'
})

export class DegreeKinshipDialog implements OnInit {
    confirm:boolean = false;

    ngOnInit(): void {
    }

    constructor(private appService: AppService, private dialogRef: MdDialogRef<DegreeKinshipDialog>) {

    }

	associateSpouse(result:boolean){		
        this.confirm = result;
        this.dialogRef.close(); 
	}

}