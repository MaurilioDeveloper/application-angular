import { Simulation } from './../../../../dto/Simulation.dto';
import { GuarantorTwoBankingService } from './../service/guarantor-2-banking.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
	selector: 'guarantor-2-banking-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_banking_cc/mobile/guarantor-2-banking-mobile-cc.component.html',
	providers: [GuarantorTwoBankingService]
})
export class GuarantorTwoBankingMobileComponent implements OnInit {

	simulation: Simulation;
	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	@Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() saveDossier: EventEmitter<any> = new EventEmitter<any>();
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
		this.getSimulation().step = 4;
		this.saveDossier.emit();
	}

}