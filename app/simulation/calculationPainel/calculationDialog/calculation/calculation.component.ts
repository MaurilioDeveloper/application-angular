import { Observable } from 'rxjs/Observable';
import { Repackage } from './../../../dto/Repackage.dto';
import { SimulationService } from './../../../simulation.service';
import { ObservableMedia } from '@angular/flex-layout';
import { Service } from './../../../dto/Service.dto';
import { Coefficient } from './../../../dto/Coefficient.dto';
import { Installment } from './../../../dto/Installment.dto';
import { InstallmentsDialog } from './installmentsDialog/installments.dialog';
import { Commission } from './../../../dto/Commission.dto';
import { FinancialTable } from './../../../dto/FinancialTable.dto';
import { FinancialType } from './../../../dto/FinancialType.dto';
import { CalculationDialog } from './../calculationDialog.dialog';
import { ServicesDialog } from './servicesDialog/servicesDialog.dialog';
import { MdDialog } from '@angular/material';
import { Calculation } from './../../../dto/Calculation.dto';
import { AppService } from './../../../../app.service';
import { Simulation } from './../../../dto/Simulation.dto';
import { Component, Input, OnInit, Output, NgModule, EventEmitter, ViewChild } from '@angular/core';
import { TypePerson } from "../../../dto/Client.dto";
import { AppMessage } from "../../../../app.message";
import { StepEnum } from './../../../step.enum';

@Component({
    selector: 'calculation',
    templateUrl: 'app/simulation/calculationPainel/calculationDialog/calculation/calculation.component.html'
})
export class CalculationComponent implements OnInit {
    simulation: Simulation;
    @Input() calculationID: string;
    @Input() enable: Boolean;
    @Input() installments: Installment;
    @Output() contratado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    @Output() compare: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    @Output() showDetailSimulation: EventEmitter<Boolean> = new EventEmitter<Boolean>();



    focusValue: boolean;
    focusPer: boolean;
    firstInstallments: String;
    firstInstallmentValue: String;
    secondInstallments: String;
    secondInstallmentValue: String;
    enableSecondInstallment: boolean;
    entranceValue: number = 0;
    entrancePerc: number = 0;
    totalValue: number;

    minEntrace: number = 0;
    minPerEntrace: number = 0;
    maxEntrace: number = 9999999999;
    maxPerEntrace: number = 100;

    total_tax: number = 0;
    total_finc: number = 0;
    total_parc: number = 0;
    customer_rate: number = 0;
    listInstallments: Object[];

    commisionList = new Array<Commission>();
    commisionSelected: Commission = new Commission;

    financialTypeSelected: FinancialType = new FinancialType;
    financialTypeList = new Array<FinancialType>();
    financialTableSelected: FinancialTable = new FinancialTable;
    financialTableList = new Array<FinancialTable>();
    calculation: Calculation;
    delayList = new Array<number>();
    delaySelected: number;
    repackageList = new Array<Repackage>();
    repackageSelected: string;
    termList = new Array<number>();
    termSelected: number;
    coeficient: Coefficient;
    taxType = new Array<String>();
    calculationSelected: boolean = false;
    showRepackage: boolean = false;

    constructor(private appService: AppService, private appMessage: AppMessage, public dialog: MdDialog, 
                        public media: ObservableMedia, private simulationService: SimulationService) {
        this.coeficient = new Coefficient;

    }

    ngOnInit() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
            this.simulation = simulation;
            if(this.simulation && this.simulation.step == StepEnum.STEP_SIMULATION){
			    this.onload();
            }
        });  
    }


	private onload(){
        if (this.enable) {
            this.initCalc();
        }

        if (this.simulation.client.cpfCnpj.length == 14) {
            this.simulation.client.typePerson = TypePerson.PJ
        } else {
            this.simulation.client.typePerson = TypePerson.PF
        }
    }

    comparation() {
        this.compare.emit(false);
        this.simulation.detailSimulation = false;
    }

    detailSimulation() {
        this.showDetailSimulation.emit(true);
    }

    initCalc() {
        if (!this.simulation.calculations[this.calculationID]) {
            this.simulation.calculations[this.calculationID] = new Calculation;
        } else {
            this.calculationSelected = this.simulation.calculations[this.calculationID].selected;
        }
        this.totalValue = this.simulation.car.version.price;
        this.simulation.calculations[this.calculationID].totalValue = this.totalValue;
        if (!this.simulation.calculations[this.calculationID]) {
            this.calculation = new Calculation;
        }

        if (this.enable) {
            this.getTaxes();
        }
    }

    getTaxes() {
        let busca = new Object;
        busca["taxas"] = this.taxType;
        busca["personType"] = this.simulation.client.typePerson
        busca["vehicleType"] = this.simulation.car.vehicleType;
        busca["vehicleGender"] = this.simulation.car.gender;
        busca["province"] = this.simulation.client.address.province.id;
        busca["vehiclesSpecial"] = this.simulation.specialTypes;
        let getTaxes = this.appService.xSearchWithData('taxService', busca);
        getTaxes.subscribe(
            (data) => {
                let taxeResponse = data.json();
                taxeResponse.listTax.forEach(tax => {
                    this.total_tax = this.total_tax + tax.value;
                });
                this.simulationFinancialType();
            })

    }



    calcValue() {

        //valor do carro
        this.totalValue = this.simulation.car.version.price;

        if (this.total_tax) {
            this.totalValue = this.totalValue + this.total_tax;
        }
        //valor dos acessorios
        if (this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories.forEach(acessory => {
                this.totalValue = acessory.value + this.totalValue;

            });
        }

        //valor dos opcionais 
        if (this.simulation.car.version.options) {
            this.simulation.car.version.options.forEach(option => {
                this.totalValue = option.amount + this.totalValue;

            });
        }

        //valor dos servicos
        if (this.simulation.calculations[this.calculationID].services) {
            this.simulation.calculations[this.calculationID].services.forEach(service => {
                if (service.amount && service.amount > 0) {
                    this.totalValue = service.amount + this.totalValue;
                }
            });
        }
        this.simulation.calculations[this.calculationID].totalValue = this.totalValue;
    }


    /**
     * seleciona o tipo de produto default
     */
    private selectFinanceTypeDefault(){
        
        let resultList = this.financialTypeList.filter(
                            function (financialType) { return financialType.description ===  'CDC'});
   
        if(resultList[0]){
            this.financialTypeSelected = resultList[0];
        }
    }

    /**
     * Financial Type 
     * */

    simulationFinancialType() {
        let requestFinancialType = new Object;
        if (this.simulation.id) {
            requestFinancialType["financeTypeSelected"] = this.simulation.calculations[this.calculationID].financialType.financeTypeId;
        } else {
            this.simulation.calculations[this.calculationID].selected = false;
        }
        let getFinancialType = this.appService.xSearchWithData('financeTypeService/getFinancialType', requestFinancialType);
        getFinancialType.subscribe(
            (data) => {
                let financeTypeResponse = data.json();
                for (var i = 0; i < financeTypeResponse.listFinanceType.length; i++) {
                    var financeType = financeTypeResponse.listFinanceType[i];
                    this.financialTypeList.push(financeType);
                    if (!financeTypeResponse.financeTypeSelected) {
                        this.selectFinanceTypeDefault();
                    } else {
                        if (financeType.financeTypeId === financeTypeResponse.financeTypeSelected.financeTypeId) {
                            this.financialTypeSelected = financeType;
                        }
                    }
                }
                this.changeFinancialType(this.financialTypeSelected);
            },
            err => {
                console.log(err.json());
            }
        );
    }

    changeFinancialType(financialType: FinancialType) {
        this.simulation.calculations[this.calculationID].financialType = financialType;
        if (!this.simulation.calculations[this.calculationID].services) {
            this.initServices();
        } else {
            this.calcValue();
            this.simulationFinancialTable();
        }
        this.showRepackage = this.isCDCFlexSelected();
    }

    private loadRepackage(){
        let observable = this.appService.xSearch('repackageService',this.financialTableSelected.productId 
                                                                                    + '/' + this.termSelected);
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.repackageList = response.listRepackage;
			},
			err => {
				console.log(err.json());
            }
        );
    }

    initServices() {
        if (!this.simulation.calculations[this.calculationID].services) {
            this.simulation.calculations[this.calculationID].services = [];
        }
        //tratamento se o objeto de simulação ja vier preenchido

        if (this.simulation.calculations[this.calculationID].services.length != 0) {
            this.calcValue();
            this.simulationFinancialTable();
            return;
        }
        let itsSaleMan;
        let observable = this.appService.xSearch('userProfile', 'verifyuseradmin');
        observable.subscribe(
            (data) => {
                let response = data.json();
                if (response.userAdmin) {
                    itsSaleMan = false;
                } else {
                    itsSaleMan = true;
                }
            });
        let query = {};
        query["structureId"] = this.simulation.salesmanStructure.structureId;
        query["productId"] = this.simulation.calculations[this.calculationID].financialType.financeTypeId;
        query["vehicleType"] = this.simulation.car.vehicleType
        let services = this.appService.xSearchWithData("serviceService/questService", query)
        services.subscribe(
            (data) => {
                let serviceResponse = data.json();
                let serviceList = serviceResponse.listService;

                serviceList.forEach(response => {
                    if (response.required || response.selecetedDefault) {
                        this.simulation.calculations[this.calculationID].services.push(response);
                    }
                });
                this.calcValue();
                this.simulationFinancialTable();
            });
    }


    simulationFinancialTable() {
        let requestFinancialTable = new Object;
        if (this.simulation.id) {
            requestFinancialTable["selected"] = this.simulation.calculations[this.calculationID].financialtable;
        }
        requestFinancialTable["idCalculation"] = this.calculationID;
        requestFinancialTable["vehicleVersion"] = this.simulation.car.version.id;

        if (this.simulation.client.typePerson) {
            requestFinancialTable["personType"] = this.simulation.client.typePerson;
        }
        let specialVehicleTypes = new Array<String>();
        if (this.simulation.specialTypes) {
            for (var i = 0; i < this.simulation.specialTypes.length; i++) {
                specialVehicleTypes.push(this.simulation.specialTypes[i].id)
            }
        }

        requestFinancialTable["saleType"] = this.simulation.saleType.id;
        requestFinancialTable["specialVehicleTypes"] = specialVehicleTypes;
        requestFinancialTable["modelYear"] = this.simulation.car.version.yearModel;
        requestFinancialTable["manufactureYear"] = this.simulation.car.version.yearManufacture;
        requestFinancialTable["financeTypeId"] = this.simulation.calculations[this.calculationID].financialType.financeTypeId;
        requestFinancialTable["vehicleType"] = this.simulation.car.gender;
        this.cleanAll()
        let getFinancialTable = this.appService.xSearchWithData('productService/questProduct', requestFinancialTable);
        getFinancialTable.subscribe(
            (data) => {
                let financeTableResponse = data.json();


                for (var i = 0; i < financeTableResponse.listProduct.length; i++) {
                    var financeTable = financeTableResponse.listProduct[i];
                    this.financialTableList.push(financeTable);
                    if (financeTableResponse.product && financeTable.productId === financeTableResponse.product.productId) {
                        this.financialTableSelected = financeTable;
                    }
                }
                if (this.financialTableList && this.financialTableList.length > 0) {
                    if (!this.financialTableSelected || !this.financialTableSelected.productId) {
                        for (var i = 0; i < this.financialTableList.length; i++) {
                            let table = this.financialTableList[i];
                            if (table.promotional) {
                                this.financialTableSelected = table;
                            }
                        }

                        if (!this.financialTableSelected || !this.financialTableSelected.productId) {
                            this.financialTableSelected = this.financialTableList[0];
                        }
                    }
                    this.changeFinancialTable(this.financialTableSelected);
                } else {
                    this.appMessage.showError("Não existem tabelas de financiamento elegíveis para os dados informados")
                }
            },
            err => {
                console.log(err.json());
            }
        );
    }

    cleanAll() {
        this.financialTableList = new Array<FinancialTable>();
        this.financialTableSelected = new FinancialTable;
        this.firstInstallments = undefined;
        this.firstInstallmentValue = undefined;
        this.secondInstallments = undefined;
        this.secondInstallmentValue = undefined;
        this.enableSecondInstallment = false;
        this.entranceValue = 0;
        this.entrancePerc = 0;

        this.minEntrace = 0;
        this.minPerEntrace = 0;
        this.maxEntrace = 9999999999;
        this.maxPerEntrace = 100;


        this.total_finc = 0;
        this.total_parc = 0;
        this.customer_rate = 0;
        this.listInstallments = [];

        this.commisionList = new Array<Commission>();
        this.commisionSelected = undefined;

        this.financialTableSelected = undefined;
        this.financialTableList = new Array<FinancialTable>();
        this.delayList = new Array<number>();
        this.repackageList = new Array<Repackage>();
        this.repackageSelected = '';
        this.delaySelected = undefined;
        this.termList = new Array<number>();
        this.termSelected = undefined;
        
    }


    changeFinancialTable(financialTable: FinancialTable) {
        this.simulation.calculations[this.calculationID].financialTable = financialTable;
        this.financialTableSelected = financialTable;
        if (this.financialTableSelected.productId) {
            this.simulationComission();
        }
    }

    changerepackage(){
         this.simulationdelay();
     }


    installmentsDialog() {
        let dialogRef = this.dialog.open(InstallmentsDialog, { height: '85%', width: '50%' });
        dialogRef.componentInstance.simulation = this.simulation;
        dialogRef.afterClosed().subscribe(result => {
        });
    }


    // recupera a comisão
    simulationComission() {
        let requestCommission = new Object;
        this.commisionSelected = new Commission;
        if (this.simulation.id) {
            requestCommission["commissionId"] = this.simulation.calculations[this.calculationID].commission.id;
        }
        requestCommission["financeTypeId"] = this.financialTypeSelected.financeTypeId;
        requestCommission["saleTypeId"] = this.simulation.saleType.id;
        requestCommission["financeTableId"] = this.financialTableSelected.productId;
        requestCommission["promotionTable"] = this.financialTableSelected.promotional;

        let getCommisionTable = this.appService.xSearchWithData('commissionLevelService/questCommissionAndTempCommission', requestCommission);
        getCommisionTable.subscribe(
            (data) => {
                let commisionTableResponse = data.json();
                this.commisionList = new Array<Commission>();
                for (var i = 0; i < commisionTableResponse.listUserCommission.length; i++) {
                    var financeCommision = commisionTableResponse.listUserCommission[i];
                    this.commisionList.push(financeCommision);
                    if (commisionTableResponse.selected && financeCommision.id === commisionTableResponse.selected.id) {
                        this.commisionSelected = financeCommision;
                    }
                }
                this.commisionList.sort((a, b) => Number(a.description.trim()) - Number(b.description.trim()))
                if (!this.commisionSelected || !this.commisionSelected.description) {
                    this.commisionSelected = this.commisionList[this.commisionList.length - 1]
                }
                this.changeCommision(this.commisionSelected);
            },
            err => {
                console.log(err.json());
            }
        );

    }


    changeCommision(comission: Commission) {

        this.commisionSelected = comission;
        if(this.commisionSelected){
           this.simulationTerm();
        }
    }

    simulationTerm() {
        let requestdelay = new Object;
        requestdelay["productId"] = this.financialTableSelected.productId;
        requestdelay["commissionId"] = this.commisionSelected.id;
        requestdelay["personType"] = this.simulation.client.typePerson;
        let getTerm = this.appService.xSearchWithData('poductCoefficient/term', requestdelay);

        getTerm.subscribe(
            (data) => {
                let financilaTermResponse = data.json();
                this.termList = new Array<number>();
                this.termSelected = undefined;
                for (var i = 0; i < financilaTermResponse.listTerm.length; i++) {
                    var element = financilaTermResponse.listTerm[i];
                    this.termList.push(element);
                    if (this.simulation.id && this.simulation.calculations[this.calculationID].term === element) {
                        this.termSelected = element;
                    }
                }
                if (!this.termSelected && this.termList.length > 0) {
                    this.termSelected = this.termList[0];
                }
                this.changeterm(this.termSelected)
            });
    }

    changeterm(term: number) {
        this.termSelected = term;
        if(this.termSelected){
            this.simulationdelay()
            if(this.showRepackage){
                this.loadRepackage();
            }
        }
    }


    simulationdelay() {
        let requestdelay = new Object;
        requestdelay["productId"] = this.financialTableSelected.productId;
        requestdelay["commissionId"] = this.commisionSelected.id;
        requestdelay["personType"] = this.simulation.client.typePerson;
        requestdelay["term"] = this.termSelected;
        let getdelay = this.appService.xSearchWithData('delayValue', requestdelay);

        getdelay.subscribe(
            (data) => {
                let delayResponse = data.json();
                this.delayList = new Array<number>();
                this.delaySelected = undefined;
                for (var i = 0; i < delayResponse.listDelayValue.length; i++) {
                    var element = delayResponse.listDelayValue[i];
                    this.delayList.push(element);
                    if (this.simulation.id && this.simulation.calculations[this.calculationID].delay === element) {
                        this.delaySelected = element;
                    }
                }
                if (!this.delaySelected && this.delayList.length > 0) {
                    this.delaySelected = this.delayList[0];
                }
                this.changedelay(this.delaySelected)
            })
    }

    changedelay(delay: number) {
        this.delaySelected = delay;
        this.getMinMaxEntrace();
    }

    private isCDCFlexSelected(): boolean{
        
        let financialTypeId = this.financialTypeSelected.financeTypeId;
        let resultList = this.financialTypeList.filter(
                            function (financialType) { return financialType.financeTypeId ===  financialTypeId});
   
        if(resultList[0]){
            return resultList[0].description === 'CDC Flex';
        }
        return false;
    }

    // Recalcular quando buscar o total
    getMinMaxEntrace() {
        let requestMinMAx = new Object;
        if (this.simulation.calculations[this.calculationID].entranceValue) {
            this.entranceValue = this.simulation.calculations[this.calculationID].entranceValue;
        }
        requestMinMAx["productId"] = this.financialTableSelected.productId;
        requestMinMAx["commissionId"] = this.commisionSelected.id;
        requestMinMAx["personType"] = this.simulation.client.typePerson;
        requestMinMAx["term"] = this.termSelected;
        requestMinMAx["delay"] = this.delaySelected;
        requestMinMAx["value"] = this.totalValue;
        let getMinMax = this.appService.xSearchWithData('entraceValue', requestMinMAx);
        getMinMax.subscribe(
            (data) => {
                let minMaxResponse = data.json();
                this.minEntrace = minMaxResponse["minValue"];
                this.minPerEntrace = minMaxResponse["minPercent"];
                this.maxEntrace = minMaxResponse["maxValue"];
                this.maxPerEntrace = minMaxResponse["maxPercent"];
                if (this.simulation.vizualization) {
                    this.validadePer((this.entranceValue / this.totalValue) * 100, false, undefined);
                } else {
                    this.validadeValue(this.entranceValue, true);
                }
            })
    }



    previuscondition() {
        let pos = this.commisionList.indexOf(this.commisionSelected);
        pos--;
        if (pos >= 0) {
            this.commisionSelected = this.commisionList[pos];
            this.changeCommision(this.commisionSelected)
        }
    }

    nextcondition() {
        let pos = this.commisionList.indexOf(this.commisionSelected);
        pos++;
        if (pos <= (this.commisionList.length - 1)) {
            this.commisionSelected = this.commisionList[pos];
            this.changeCommision(this.commisionSelected)
        }
    }

    /**
     * Financial Table
     */




    servicesAndInsurance() {
        let dialogRef = this.dialog.open(ServicesDialog, { height: '85%', width: '50%' });
        dialogRef.componentInstance.simulation = this.simulation
        dialogRef.componentInstance.calculationID = this.calculationID;
        dialogRef.afterClosed().subscribe(result => {
            this.simulation.calculations[this.calculationID].services.length = 0
            dialogRef.componentInstance.serviceList.forEach(exist => {
                if (exist.checked) {
                    this.simulation.calculations[this.calculationID].services.push(exist);
                }
            });
            this.calcValue();
            this.getMinMaxEntrace();
        });
        // this.dialog.close(CalculationDialog);
    }




    addSimulation() {
        this.enable = true;
        this.simulation.calculations[this.calculationID] = new Calculation;
        this.simulationFinancialType();
        this.initCalc();
    }
    removeSimulation() {
        this.simulation.calculations[this.calculationID] = undefined;
        this.enable = false;
    }

    contratarSimulacao() {
        /*  this.simulation.calculation = */
    }

    hire() {
        this.contratado.emit(false);
    }

    validadeEntryValue(value) {
        this.validadeValue(value, true);
    }

    validadeEntryPerc(perc) {
        this.validadePer(perc, true, undefined);
    }

    validadeValue(value, tela: boolean) {
        let start = (<HTMLInputElement>document.getElementById("entranceValue")).selectionStart;
        let end = (<HTMLInputElement>document.getElementById("entranceValue")).selectionEnd;

        //correção bug - nº 125998
        if(parseFloat(value.toString().replace(',', '.')) < 0){
            value = parseFloat(value.toString().replace(',', '.')) * -1;
          
            (<HTMLInputElement>document.getElementById("entranceValue")).value = value;
        }
        //
        let change = false;
        if (parseFloat(value.toString().replace(',', '.')) < this.minEntrace) {
            value = this.minEntrace;
            change = true;
        }
        if (parseFloat(value.toString().replace(',', '.')) > this.maxEntrace) {
            value = this.maxEntrace;
            change = true;
        }
 
        if (typeof value === "string") {
            this.validadePer((parseFloat(parseFloat(value.replace(',', '.')).toFixed(2)) / this.totalValue) * 100, false, parseFloat(value.replace(',', '.')).toFixed(2));
        } else {
            this.validadePer((value / this.totalValue) * 100, false, value);
        }

        if (tela) {
            if (change) {
                this.entranceValue = parseFloat(value.toString().replace(',', '.'));
            }
            let haveComa = (("" + value).indexOf(',') != -1);
            let repp = ("" + value).replace(',', '.');
            let test = (repp.indexOf('.')!= -1 && repp.indexOf('.') < repp.length - 3)
            if (test) {
                let ret: any = parseFloat(value.toString().replace(',', '.'));
                if (haveComa) {
                    ret = ret.toFixed(2).replace('.', ',');
                } else {
                    ret = ret.toFixed(2);
                }

                setTimeout(() => {
                    (<HTMLInputElement>document.getElementById("entranceValue")).value = ret;
                    (<HTMLInputElement>document.getElementById("entranceValue")).setSelectionRange(start, end);
                });

            }
        } else {
            if (document.activeElement != document.getElementById("entranceValue")) {
                setTimeout(() => {
                    (<HTMLInputElement>document.getElementById("entranceValue")).value = "R$ " + (parseFloat(value.toString().replace(',', '.')).toFixed(2)).replace('.', ',')
                });
            }

        }
        if(!this.entranceValue){
            this.entranceValue = 0;
        }
     

    }

    validadePer(value, tela: boolean, val) {
        if (value < this.minPerEntrace) {
            value = this.minPerEntrace;
            (<HTMLInputElement>document.getElementById("entrancePerc")).value = value;
            this.entrancePerc = value;
        }
        if (value > this.maxPerEntrace) {
            value = this.maxPerEntrace;
            (<HTMLInputElement>document.getElementById("entrancePerc")).value = value;
            this.entrancePerc = value;
        }
        if (!value) {
            value = 0;
        }
        if (tela) {
            let start = (<HTMLInputElement>document.getElementById("entrancePerc")).selectionStart;
            let end = (<HTMLInputElement>document.getElementById("entrancePerc")).selectionEnd;
            let haveComa = (("" + value).indexOf(',') != -1);
            let repp = ("" + value).replace(',', '.');
            let test = (repp.indexOf('.')!= -1 && repp.indexOf('.') < repp.length - 3)
            if (test) {
                let ret: any = parseFloat(value.toString().replace(',', '.'));
                if (haveComa) {
                    ret = ret.toFixed(2).replace('.', ',');
                } else {
                    ret = ret.toFixed(2);
                }
                (<HTMLInputElement>document.getElementById("entrancePerc")).value = ret;
           
                value = (parseFloat(parseFloat(value.toString().replace(',', '.')).toFixed(2)));
                this.entrancePerc = value;
             }

             if (typeof value === "string") {
                this.validadeValue( this.totalValue *(parseFloat(parseFloat(value.replace(',', '.')).toFixed(2)) / 100), false);
            } else {
                this.validadeValue(this.totalValue * (value / 100), false);
            }
           
        } else {
            if (document.activeElement != document.getElementById("entrancePerc")) {
                this.entrancePerc = parseFloat(parseFloat(value.toString().replace(',', '.')).toFixed(2));
                (<HTMLInputElement>document.getElementById("entrancePerc")).value = parseFloat(value.toString().replace(',', '.')).toFixed(2);
            }
            if (val) {
                if(val === NaN || val === "NaN"){
                    val = 0
                }
                this.buscaCoeficents(val);
            } else {
                if(this.entranceValue<0){
                    this.entranceValue = this.entranceValue*-1;    
                }
                this.buscaCoeficents(this.entranceValue);
            }
        }
    }


    buscaCoeficents(entry) {
        let requestCoef = new Object;
        requestCoef["productId"] = this.financialTableSelected.productId;
        requestCoef["commissionId"] = this.commisionSelected.id;
        requestCoef["personType"] = this.simulation.client.typePerson;
        requestCoef["term"] = this.termSelected;
        requestCoef["delayValue"] = this.delaySelected;
        requestCoef["value"] = this.totalValue;
        if (this.entrancePerc) {
            requestCoef["entryPercent"] = this.entrancePerc;
        } else {
            requestCoef["entryPercent"] = 0.0;
        }

        let getCoef = this.appService.xSearchWithData('poductCoefficient', requestCoef);

        getCoef.subscribe(
            (data) => {
                let coefResponse = data.json();
                this.coeficient = coefResponse.coefficient

                this.recalcParcels(entry);
            })

    }

    recalcParcels(entry) {
        if (this.simulation.vizualization) {
            this.parcelCount();
            this.updateSimulationObject();
            return;
        }

        this.simulation.showBtnSave = false;
        let requestParcels = new Object;
        requestParcels["productId"] = this.financialTableSelected.productId;
        requestParcels["coefficientId"] = this.coeficient.coeffcientId;
        requestParcels["commissionId"] = this.commisionSelected.id;
        requestParcels["personType"] = this.simulation.client.typePerson;
        requestParcels["term"] = this.termSelected;
        requestParcels["delay"] = this.delaySelected;
        requestParcels["priceVehicle"] = this.simulation.car.version.price;
        requestParcels["gender"] = this.simulation.car.gender
        requestParcels["provinceId"] = this.simulation.client.address.province.id
        if (entry) {
            requestParcels["valueEntry"] = entry;
        } else {
            requestParcels["valueEntry"] = 0.0;
        }

        let listoptions = new Array<String>();
        if (this.simulation.car.version.options) {
            this.simulation.car.version.options.forEach(option => {
                listoptions.push(option.id);
            });
        }
        requestParcels["listOptions"] = listoptions;

        let totalAccessories = 0;

        if (this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories.forEach(acessory => {
                totalAccessories += acessory.value;
            });
        }
        requestParcels["totalAccessories"] = totalAccessories;

        let listServices = new Array<Service>();
        if (this.simulation.calculations[this.calculationID].services) {
            this.simulation.calculations[this.calculationID].services.forEach(service => {
                listServices.push(service);
            });
        }
        requestParcels["listServices"] = listServices


        let listSpecialTypeId = new Array<string>();
        if (this.simulation.specialTypes) {
            this.simulation.specialTypes.forEach(specialType => {
                listSpecialTypeId.push(specialType.id);
            });
        }
        requestParcels["specialTypeIdList"] = listSpecialTypeId
        requestParcels["listTaxes"] = this.taxType;

        //valor dos servicos
        requestParcels["financeTypeId"] = this.financialTypeSelected.financeTypeId;
        
        //sera enviado caso o for CDC Flex
        if(this.showRepackage && this.repackageSelected){
            requestParcels["repackageId"] = this.repackageSelected;
        }

        let getParcels = this.appService.xSearchWithData('simulationCalc', requestParcels);
        getParcels.subscribe(
            (data) => {
                let parcelsResponse = data.json();
                this.simulation.calculations[this.calculationID].installments = parcelsResponse.calculate.listParcel;
                this.parcelCount();
                this.updateSimulationObject();
                this.simulation.showBtnSave = true;
            })

    }

    parcelCount() {
        let retorno = {};
        for (var i = 0; i < this.simulation.calculations[this.calculationID].installments.length; i++) {
            let amount = this.simulation.calculations[this.calculationID].installments[i].amount;
            if (!retorno[amount]) {
                retorno[amount] = 1;
            } else {
                retorno[amount] = retorno[amount] + 1;
            }
        }

        let keys = Object.keys(retorno);
        let ik = 0;
        keys.forEach(key => {
            if (ik == 0) {
                this.firstInstallments = retorno[key] + "x";
                this.firstInstallmentValue = key;
            } else if (ik == 1) {
                this.secondInstallments = retorno[key] + "x";
                this.secondInstallmentValue = key;
                this.enableSecondInstallment = true;
            } else {
                return;
            }
            ik++;
        });



    }

    updateSimulationObject() {
        this.simulation.calculations[this.calculationID].financialTable = this.financialTableSelected
        this.simulation.calculations[this.calculationID].coeficiente = this.coeficient;
        this.simulation.calculations[this.calculationID].commission = this.commisionSelected;
        this.simulation.calculations[this.calculationID].delay = this.delaySelected;
        this.simulation.calculations[this.calculationID].entraceValue = this.entranceValue;
        this.simulation.calculations[this.calculationID].financialType = this.financialTypeSelected;
        this.simulation.calculations[this.calculationID].term = this.termSelected;
    }

    contract() {
        //remove o selecionado das simulações
        for(let calculation of this.simulation.calculations){
            calculation.selected = false;
        }
        this.simulation.calculations[this.calculationID].selected = true;
        this.simulation.calculationSelected = this.simulation.calculations[this.calculationID];
        this.contratado.emit(true);
    }


    listTaxes() {
        if (!this.simulation.tc) {
            this.taxType.push("TC");
        }

        if (this.simulation.car.vehicleType != "NOVO") {
            this.taxType.push("TAB");
        }

        this.taxType.push("TR");
    }

    newCalculate() {
        let listServices = new Array<Service>();
        if (this.simulation.calculations[this.calculationID].services) {
            this.simulation.calculations[this.calculationID].services.forEach(service => {
                listServices.push(service);
            });
        }

        let listSpecialTypeId = new Array<string>();
        if (this.simulation.specialTypes) {
            this.simulation.specialTypes.forEach(specialType => {
                listSpecialTypeId.push(specialType.id);
            });
        }

        let requestCalculate = {
            deposit: this.entranceValue,
            vehiclePrice: this.simulation.car.version.price,
            repackageId: this.repackageSelected,
            commissionId: this.commisionSelected.id,
            productId: this.financialTableSelected.productId,
            saleTypeId: this.simulation.saleType.id,
            financeTypeId: this.financialTypeSelected.financeTypeId,
            vehicleVersionId: this.simulation.car.version.id,
            personType: this.simulation.client.typePerson,
            term: this.termSelected,
            delayValue: this.delaySelected,
            province: this.simulation.client.address.province.id,
            tcExempt: this.simulation.tc,
            vehiclesSpecial: listSpecialTypeId,
            services: listServices
        };

        let newCalculate = this.appService.xSearchWithData('simulationCalc/calculate', requestCalculate);
        newCalculate.subscribe(
            (data) => {
                let response = data.json();

            },
            err => {

            }
        );            
    }

}