import { SpouseService } from './../service/spouce.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
	selector: 'spouse-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/spouse_cc/mobile/spouse-mobile-cc.component.html',
	providers: [SpouseService]
})
export class SpouseMobileComponent implements OnInit {

	simulation: Simulation;
	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();

	conf: boolean = false;

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

	nextStep() {
		if (!this.conf) {
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 5;
		this.getSimulation().step++;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}