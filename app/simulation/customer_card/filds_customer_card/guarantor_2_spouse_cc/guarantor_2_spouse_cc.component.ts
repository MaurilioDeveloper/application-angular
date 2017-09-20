import { GuarantorTwoSpouseService } from './service/guarantor-2-spouse.service';
import { SimulationService } from './../../../simulation.service';
import { IssuingBody } from './../../../dto/client/IssuingBody.dto';
import { Profession } from './../../../dto/client/Profession.dto';
import { Occupation } from './../../../dto/client/Occupation.dto';
import { DocumentType } from './../../../dto/client/DocumentType.dto';
import { Province } from './../../../../commons/province/dto/province.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'guarantor-2-spouse-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_spouse_cc/guarantor_2_spouse_cc.component.html',
	providers: [GuarantorTwoSpouseService]
})
export class Guarantor2SpouseCustomerCardComponent implements OnInit {

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
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}