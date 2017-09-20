import { ServicesDialog } from './../../../calculationPainel/calculationDialog/calculation/servicesDialog/servicesDialog.dialog';
import { InstallmentsDialog } from './../../../calculationPainel/calculationDialog/calculation/installmentsDialog/installments.dialog';
import { Service } from './../../../dto/Service.dto';
import { Coefficient } from './../../../dto/Coefficient.dto';
import { Installment } from './../../../dto/Installment.dto';
import { Commission } from './../../../dto/Commission.dto';
import { FinancialTable } from './../../../dto/FinancialTable.dto';
import { FinancialType } from './../../../dto/FinancialType.dto';
import { MdDialog } from '@angular/material';
import { Calculation } from './../../../dto/Calculation.dto';
import { AppService } from './../../../../app.service';
import { Simulation } from './../../../dto/Simulation.dto';
import { Component, Input, OnInit, Output, NgModule, EventEmitter } from '@angular/core';
import { TypePerson } from "../../../dto/Client.dto";
import { AppMessage } from "../../../../app.message";


@Component({
    selector: 'calculation-mobile',
    templateUrl: 'app/simulation/mobile/calculationMobile/calculationPainelMobile/calculation-mobile.component.html'
})
export class CalculationPainelMobileComponent implements OnInit {
    @Input() simulation: Simulation;
    @Input() calculationID: string;
    @Input() enable: Boolean;
    @Input() installments: Installment;
    @Output() dados: EventEmitter<Object[]> = new EventEmitter<Object[]>();


    firstInstallments: String;
    firstInstallmentValue: number;
    secondInstallments: String;
    secondInstallmentValue: number;
    enableSecondInstallment: boolean;
    entranceValue: number = 0;
    entrancePerc: number = 0;
    totalValue: number;

    minEntrace: number = 0;
    minPerEntrace: number = 0;
    maxEntrace: number = 9999999999;
    maxPerEntrace: number = 100;

    total_tax:number=0;
    total_finc: number = 0;
    total_parc: number = 0;
    customer_rate: number = 0;

    commisionList = new Array<Commission>();
    commisionSelected: Commission = new Commission;

    financialTypeSelected: FinancialType = new FinancialType;
    financialTypeList = new Array<FinancialType>();
    financialTableSelected: FinancialTable = new FinancialTable;
    financialTableList = new Array<FinancialTable>();
    calculation: Calculation;
    delayList = new Array<number>();
    delaySelected: number;
    termList = new Array<number>();
    termSelected: number;
    coeficient: Coefficient;
    taxType = new Array<String>();
    calculationSelected :boolean  = false;


    ngOnInit() {
        if(this.calculationID == "0") {
            this.enable = true;
        }
        if(!this.simulation.calculations[this.calculationID]){
            this.simulation.calculations[this.calculationID]= new Calculation;
        }else{
            this.calculationSelected = this.simulation.calculations[this.calculationID].selected;
        }
        if (!this.simulation.client.typePerson) {
            if (this.simulation.client.cpfCnpj.length == 14) {
                this.simulation.client.typePerson = TypePerson.PJ
            } else {
                this.simulation.client.typePerson = TypePerson.PF
            }
        }

    }


    showDetailSimulation() {
        this.enable = true;
        this.simulation.detailSimulation = true;
    }

    compare() {
        this.enable = false;
        this.simulation.detailSimulation = false;
    }

 

    constructor(private appService: AppService, private appMessage: AppMessage, public dialog: MdDialog) {

    }

    contract() {
        this.simulation.calculations[this.calculationID].selected = true;
        this.simulation.calculationSelected = this.simulation.calculations[this.calculationID];
        this.simulation.reviewContractSimulation = true;
    }


}