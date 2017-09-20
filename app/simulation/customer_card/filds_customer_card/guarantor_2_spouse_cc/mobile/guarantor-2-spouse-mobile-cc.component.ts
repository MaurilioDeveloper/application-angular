import { Simulation } from './../../../../dto/Simulation.dto';
import { GuarantorTwoSpouseService } from './../service/guarantor-2-spouse.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'guarantor-2-spouse-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_spouse_cc/mobile/guarantor-2-spouse-mobile-cc.component.html',
	providers: [GuarantorTwoSpouseService]
})
export class GuarantorTwoSpouseMobileComponent implements OnInit {

	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();

	constructor(private guarantorTwoSpouseService: GuarantorTwoSpouseService) {
	}

	ngOnInit() {
		this.guarantorTwoSpouseService.init();
	}

	getListProvince(): Object[] {
		return this.guarantorTwoSpouseService.listProvince;
	}

	getListSex(): Object[] {
		return this.guarantorTwoSpouseService.listSex;
	}

	getListTypePhone(): Object[] {
		return this.guarantorTwoSpouseService.listTypePhone;
	}

	getListDocumentType(): Object[] {
		return this.guarantorTwoSpouseService.listDocumentType;
	}

	getListOccupation(): Object[] {
		return this.guarantorTwoSpouseService.listOccupation;
	}

	getListPositionFunction(): Object[] {
		return this.guarantorTwoSpouseService.listPositionFunction;
	}

	getListIssuingBody(): Object[] {
		return this.guarantorTwoSpouseService.listIssuingBody;
	}

	getSimulation(): Simulation {
		return this.guarantorTwoSpouseService.simulation;
	}
	
	nextStep() {
		this.controlDynamicStepsIn = 18;
		this.getSimulation().step++;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}