import { Guarantor } from './../../../../dto/client/Guarantor.dto';
import { BankDetails } from './../../../../dto/client/BankDetails.dto';
import { Bank } from './../../../../dto/client/Bank.dto';
import { AppMessage } from './../../../../../app.message';
import { AppService } from './../../../../../app.service';
import { SimulationService } from './../../../../simulation.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';


@Injectable()
export class GuarantorTwoBankingService {

    simulation: Simulation;

    listBank: Array<Bank> = new Array<Bank>();

	listAccountType: { 'id': String, 'description': String }[] = [];

	isRequiredBanking: boolean = false;
    
    constructor(private appService: AppService, private appMessage: AppMessage, private simulationService: SimulationService) {
    }

	init() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
            this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_TWO_BANKING)) {
			    this.onload();
            }
        });  
	}

    private initializeFields(){
		if(!this.simulation.client.guarantor2) this.simulation.client.guarantor2 = new Guarantor();
		if(!this.simulation.client.guarantor2.bankDetails) this.simulation.client.guarantor2.bankDetails = new BankDetails();
        if(!this.simulation.client.guarantor2.bankDetails.bank) this.simulation.client.guarantor2.bankDetails.bank = new Bank();
    }
    
	onload(){
		this.initializeFields();
		this.loadBank();
		this.loadAccountType();
		this.simulation.client.guarantor2.bankDetails.accountType = 'CORRENTE';
	}

    
	loadBank() {
		let result = this.appService.xSearch('customerCardService', 'findAllBank')
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listBank = response.listBank;
			},
			err => {
				console.log(err.json());
			}
		);
	}

	loadAccountType() {
		let accountType = {
			'id': 'C',
			'description': 'CORRENTE'
		}
		this.listAccountType.push(accountType);
	}

	validBankSelected() {
		let idBank = this.simulation.client.guarantor2.bankDetails.bank.id;
		let banks: any;
		banks = this.listBank.filter(bank => bank.id === idBank);
		if(banks[0]){
			this.simulation.client.guarantor2.bankDetails.bank.importCode = banks[0].importCode;
			this.selectBank();
		}
	}

	selectBank() {
		this.isRequiredBanking = true;
		if (this.simulation.client.guarantor2.bankDetails.bank.id) {
			this.isRequiredBanking = true;
		} else {
			this.isRequiredBanking = false;
		}
	}

	validCodeBankSelected() {
		let idimportCodeBank = this.simulation.client.guarantor2.bankDetails.bank.importCode;
		let banks: any;
		banks = this.listBank.filter(bank => bank.importCode === idimportCodeBank);
		if (banks[0]) {
			this.simulation.client.guarantor2.bankDetails.bank.id = banks[0].id;
		}else{
			this.simulation.client.guarantor2.bankDetails.bank.id = null;
		}
	}
    


}