import { GuarantorTwoPersonService } from './service/guarantor-2-person.service';
import { SimulationService } from './../../../simulation.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'guarantor-2-person-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_person_cc/guarantor_2_person_cc.component.html',
	providers: [GuarantorTwoPersonService]
})
export class Guarantor2PersonCustomerCardComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	conf:boolean = false;

	constructor(private guarantorTwoPersonService: GuarantorTwoPersonService) {
	};

	ngOnInit() {
		this.guarantorTwoPersonService.init();
	}

	getSimulation(): Simulation {
		return this.guarantorTwoPersonService.simulation;
	}

	nextStep() {
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 20;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}