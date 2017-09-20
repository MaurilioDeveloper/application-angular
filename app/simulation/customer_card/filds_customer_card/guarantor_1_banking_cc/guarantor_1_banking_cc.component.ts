import { GuarantorOneBankingService } from './service/guarantor-1-banking.service';
import { SimulationService } from './../../../simulation.service';
import { Bank } from './../../../dto/client/Bank.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'guarantor-1-banking-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_banking_cc/guarantor_1_banking_cc.component.html',
	providers: [GuarantorOneBankingService]
})
export class Guarantor1BankingCustomerCardComponent implements OnInit {

	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	@ViewChild("cmdbankguar1") cmdBankGuarantor1 : any;

	constructor(private guarantorOneBankingService: GuarantorOneBankingService) {
	};

	ngOnInit() {
		this.guarantorOneBankingService.init();
	}
	
	getListBank(): Object[] {
		return this.guarantorOneBankingService.listBank;
	}

	getListAccountType(): Object[] {
		return this.guarantorOneBankingService.listAccountType;
	}

	getIsRequiredBanking(): boolean {
		return this.guarantorOneBankingService.isRequiredBanking;
	}

	getSimulation(): Simulation {
		return this.guarantorOneBankingService.simulation;
	}
	
	validBankSelected(){
		this.guarantorOneBankingService.validBankSelected();
	}
	
	validCodeBankSelected(){
		if(this.cmdBankGuarantor1.selected) this.cmdBankGuarantor1.selected._selected = false;
		this.guarantorOneBankingService.validCodeBankSelected();
	}

	nextStep() {
		this.controlDynamicStepsIn = 15;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}