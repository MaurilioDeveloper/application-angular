import { Phone } from './../../../../dto/client/Phone.dto';
import { Bank } from './../../../../dto/client/Bank.dto';
import { LoaderService } from './../../../../../app.spinner';
import { AppMessage } from './../../../../../app.message';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable, Input } from '@angular/core';
import { SimulationService } from './../../../../simulation.service';
import { AppService } from './../../../../../app.service';
import { StepEnum } from './../../../../step.enum';
import { BankDetails } from './../../../../dto/client/BankDetails.dto';

@Injectable()
export class BankingDataService {

    simulation: Simulation;
    conf: boolean = false;
    listBank: Bank[] = [];
    listAccountType: { 'id': String, 'description': String }[] = [];
    isRequiredBanking: boolean = false;

    constructor(private appService: AppService, private appMessage: AppMessage, private simulationService: SimulationService) {
    };


    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if (this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_BANKING_REFENCES)) {
                this.onload();
            }
        });
    }

    
    private initializeFields(){
        if(!this.simulation.client.bankDetails) this.simulation.client.bankDetails = new BankDetails();
        if(!this.simulation.client.bankDetails.phoneBranch) this.simulation.client.bankDetails.phoneBranch = new Phone();
        if(!this.simulation.client.bankDetails.bank) this.simulation.client.bankDetails.bank = new Bank();
        this.simulation.client.bankDetails.accountType = "CORRENTE";
    }

    private onload() {
        this.initializeFields();
        this.loadBank();
        this.loadAccountType();
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
        let idBank = this.simulation.client.bankDetails.bank.id;
        let banks: any;
        banks = this.listBank.filter(bank => bank.id === idBank);
        if (banks[0]) {
            this.simulation.client.bankDetails.bank.importCode = banks[0].importCode;
            this.selectBank();
        }
    }

    selectBank() {
        if (this.simulation.client.bankDetails.bank.id) {
            this.isRequiredBanking = true;
        } else {
            this.isRequiredBanking = false;
        }
        
    }

    validCodeBankSelected() {
        let idimportCodeBank = this.simulation.client.bankDetails.bank.importCode;
        let bank: any;
        bank = this.listBank.filter(bank => bank.importCode === idimportCodeBank);
        if (bank[0]) {
            this.simulation.client.bankDetails.bank.id = bank[0].id;
        }else{
            this.simulation.client.bankDetails.bank.id = null;
        }
    }

}