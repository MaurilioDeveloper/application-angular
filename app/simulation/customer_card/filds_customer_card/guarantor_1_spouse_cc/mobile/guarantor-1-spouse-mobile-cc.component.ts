import { Simulation } from './../../../../dto/Simulation.dto';
import { GuarantorOneSpouseService } from './../service/guarantor-1-spouse.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
	selector: 'guarantor-1-spouse-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_spouse_cc/mobile/guarantor-1-spouse-mobile-cc.component.html',
	providers: [GuarantorOneSpouseService]
})
export class GuarantorOneSpouseMobileComponent implements OnInit {

	simulation: Simulation;
	@Input() controlDynamicStepsIn: number;
	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();

	conf: boolean = false;

	constructor(private guarantorOneSpouseService: GuarantorOneSpouseService) {
	}

	ngOnInit() {
		this.guarantorOneSpouseService.init();
	}


	getListProvince(): Object[] {
		return this.guarantorOneSpouseService.listProvince;
	}

	getListIssuingBody(): Object[] {
		return this.guarantorOneSpouseService.listIssuingBody;
	}

	getListSex(): Object[] {
		return this.guarantorOneSpouseService.listSex;
	}

	getListTypePhone(): Object[] {
		return this.guarantorOneSpouseService.listTypePhone;
	}

	getListDocumentType(): Object[] {
		return this.guarantorOneSpouseService.listDocumentType;
	}

	getListOccupation(): Object[] {
		return this.guarantorOneSpouseService.listOccupation;
	}

	getListPositionFunction(): Object[] {
		return this.guarantorOneSpouseService.listPositionFunction;
	}

	getSimulation(): Simulation {
		return this.guarantorOneSpouseService.simulation;
	}
 
	nextStep() {
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		
		this.controlDynamicStepsIn = 12;
		this.getSimulation().step++;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}