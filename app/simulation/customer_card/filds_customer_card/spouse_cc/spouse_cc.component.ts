import { SpouseService } from './service/spouce.service';
import { SimulationService } from './../../../simulation.service';
import { Spouse } from './../../../dto/client/Spouse.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'spouse-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/spouse_cc/spouse_cc.component.html',
	providers: [SpouseService]
})
export class SpouseCustomerCardComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();

	conf:boolean = false;

	constructor(private spouseService: SpouseService) {
	}

	ngOnInit() {
		this.spouseService.init();
	}
	
	getSimulation(): Simulation {
		return this.spouseService.simulation;
	}

	getListProvince(): Object[] {
		return this.spouseService.listProvince;
	}

	getListSex(): Object[] {
		return this.spouseService.listSex;
	}

	getListOccupation(): Object[] {
		return this.spouseService.listOccupation;
	}

	getListPositionFunction(): Object[] {
		return this.spouseService.listPositionFunction;
	}

	getListIssuingBody(): Object[] {
		return this.spouseService.listIssuingBody;
	}

	getIsRequiredSpouse(): boolean {
		return this.spouseService.isRequiredSpouse;
	}

	nextStep(){
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 5;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}