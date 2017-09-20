import { GuarantorTwoProfessionalService } from './service/guarantor-2-professional.service';
import { SimulationService } from './../../../simulation.service';
import { ProofIncomeType } from './../../../dto/client/ProofIncomeTypeDTO.dto';
import { IncomeType } from './../../../dto/client/IncomeType.dto';
import { Profession } from './../../../dto/client/Profession.dto';
import { Occupation } from './../../../dto/client/Occupation.dto';
import { EconomicActivityGroup } from './../../../dto/client/EconomicActivityGroup.dto';
import { EconomicActivity } from './../../../dto/client/EconomicActivity.dto';
import { CompanySize } from './../../../dto/client/EmployerSize.dto';
import { Province } from './../../../../commons/province/dto/province.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'guarantor-2-professional-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_professional_cc/guarantor_2_professional_cc.component.html',
	providers: [GuarantorTwoProfessionalService]
})
export class Guarantor2ProfessionalCustomerCardComponent implements OnInit {

	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();

	constructor(private guarantorTwoProfessionalService: GuarantorTwoProfessionalService) {
	};

	ngOnInit() {
		this.guarantorTwoProfessionalService.init();
	}

	getListProvince(): Object[] {
		return this.guarantorTwoProfessionalService.listProvince;
	}

	getListSizeCompany(): Object[] {
		return this.guarantorTwoProfessionalService.listSizeCompany;
	}

	getListEconomicActivityGroup(): Object[] {
		return this.guarantorTwoProfessionalService.listEconomicActivityGroup;
	}

	getListEconomicActivity(): Object[] {
		return this.guarantorTwoProfessionalService.listEconomicActivity;
	}

	getListOccupation(): Object[] {
		return this.guarantorTwoProfessionalService.listOccupation;
	}

	getListPositionFunction(): Object[] {
		return this.guarantorTwoProfessionalService.listPositionFunction;
	}

	getlistTypeOfIncome(): Object[] {
		return this.guarantorTwoProfessionalService.listTypeOfIncome;
	}

	getListTypeProofOfIncome(): Object[] {
		return this.guarantorTwoProfessionalService.listTypeProofOfIncome;
	}

	getIsRequiredNameGuarantor(): boolean {
		return this.guarantorTwoProfessionalService.isRequiredNameGuarantor;
	}

	getIsRequiredCNPJGuarantor(): boolean {
		return this.guarantorTwoProfessionalService.isRequiredCNPJGuarantor;
	}

	getIsRequiredPhoneGuarantor(): boolean {
		return this.guarantorTwoProfessionalService.isRequiredPhoneGuarantor;
	}

	getSimulation(): Simulation {
		return this.guarantorTwoProfessionalService.simulation;
	}
	
	validOccupation(){
		this.guarantorTwoProfessionalService.validOccupation();
	}

	nextStep() {
		this.controlDynamicStepsIn = 19;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}