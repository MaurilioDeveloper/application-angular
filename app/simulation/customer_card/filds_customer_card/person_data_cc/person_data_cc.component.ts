import { PersonDataService } from './service/person-data.service';
import { SimulationService } from './../../../simulation.service';
import { Reference } from './../../../dto/client/Reference.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'person-data-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/person_data_cc/person_data_cc.component.html',
	providers: [PersonDataService]
})
export class PersonDataCustomerCardComponent implements OnInit {
	
	@Input() controlDynamicStepsIn: number;
	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();

	conf: boolean = false;

	constructor(private personDataService: PersonDataService) {
	};

	ngOnInit() {
		this.personDataService.init();
	}

	getSimulation(): Simulation {
		return this.personDataService.simulation;
	}

	nextStep() {
		if (!this.conf) {
			this.countClient.emit();
			this.conf = true;
		}

		this.controlDynamicStepsIn = 7;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}