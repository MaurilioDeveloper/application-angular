import { BankingDataService } from './service/banking-service.service';
import { SimulationService } from './../../../simulation.service';
import { Bank } from './../../../dto/client/Bank.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'banking-references-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/banking_references_cc/banking_references_cc.component.html',
	providers: [BankingDataService]
})
export class BankingReferencesDataCustomerCardComponent implements OnInit {


	@Input() controlDynamicStepsIn: number;
	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
   	@ViewChild('cmb') cmbBank: any;
	conf: boolean = false;

	constructor(private bankingDataService: BankingDataService) {
	};

	ngOnInit() {
		this.bankingDataService.init();
	}

	nextStep() {
		if (!this.conf) {
			this.countClient.emit();
			this.conf = true;
		}

		this.controlDynamicStepsIn = 8;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

	getListBank(): Object[] {
		return this.bankingDataService.listBank;
	}

	getListAccountType(): Object[] {
		return this.bankingDataService.listAccountType;
	}

	getIsRequiredBanking(): boolean {
		return this.bankingDataService.isRequiredBanking;
	}

	getSimulation(): Simulation {
		return this.bankingDataService.simulation;
	}

	selectBank() {
		this.bankingDataService.selectBank();
	}

	validCodeBankSelected() {
		this.cmbBank.options.forEach(element => {
			if(element._selected) {
				element._selected = false;
				this.getSimulation().client.bankDetails.bank.id = null;
				
				return true;
			}
		});

		this.bankingDataService.validCodeBankSelected();
	}

	validBankSelected() {
		this.bankingDataService.validBankSelected();
	}

}