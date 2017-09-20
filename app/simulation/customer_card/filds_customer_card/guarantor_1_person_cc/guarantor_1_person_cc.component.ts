import { GuarantorOnePersonService } from './service/guarantor-1-person.service';
import { SimulationService } from './../../../simulation.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'guarantor-1-person-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_person_cc/guarantor_1_person_cc.component.html',
	providers: [GuarantorOnePersonService]
})
export class Guarantor1PersonCustomerCardComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	conf:boolean = false;

	constructor(private guarantorOnePersonService: GuarantorOnePersonService) {
	};

	ngOnInit() {
        this.guarantorOnePersonService.init();
	}

	getSimulation(): Simulation {
		return this.guarantorOnePersonService.simulation;
	}

	nextStep() {
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 14;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}