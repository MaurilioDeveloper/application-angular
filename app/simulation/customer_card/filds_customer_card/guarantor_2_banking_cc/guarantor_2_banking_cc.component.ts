import { GuarantorTwoBankingService } from './service/guarantor-2-banking.service';
import { SimulationService } from './../../../simulation.service';
import { Bank } from './../../../dto/client/Bank.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'guarantor-2-banking-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_banking_cc/guarantor_2_banking_cc.component.html',
	providers: [GuarantorTwoBankingService]
})
export class Guarantor2BankingCustomerCardComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	@ViewChild("cmdbankguar2") cmdBankGuarantor2 : any;
	conf: boolean = false;

	constructor(private guarantorTwoBankingService: GuarantorTwoBankingService) {
	};

	ngOnInit() {
		this.guarantorTwoBankingService.init();
	}

	getListBank(): Object[] {
		return this.guarantorTwoBankingService.listBank;
	}

	getListAccountType(): Object[] {
		return this.guarantorTwoBankingService.listAccountType;
	}

	getIsRequiredBanking(): boolean {
		return this.guarantorTwoBankingService.isRequiredBanking;
	}

	getSimulation(): Simulation {
		return this.guarantorTwoBankingService.simulation;
	}

	validBankSelected(){
		this.guarantorTwoBankingService.validBankSelected();
	}

	validCodeBankSelected(){
		if(this.cmdBankGuarantor2.selected) this.cmdBankGuarantor2.selected._selected = false; 
		this.guarantorTwoBankingService.validCodeBankSelected();
	}

	nextStep() {
		this.countClient.emit();
	}

}