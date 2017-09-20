import { Simulation } from './../../../../dto/Simulation.dto';
import { Output, Input, ViewChild } from '@angular/core';
import { AppService } from './../../../../../app.service';
import { SimulationService } from './../../../../simulation.service';
import { AppMessage } from './../../../../../app.message';
import { EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { BankingDataService } from './../service/banking-service.service';

@Component({
	selector: 'banking-references-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/banking_references_cc/mobile/banking-references-mobile-cc.component.html',
	providers: [BankingDataService]
})
export class BankingReferencesDataCustomerCardMobileComponent implements OnInit {

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
		this.getSimulation().step++;
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