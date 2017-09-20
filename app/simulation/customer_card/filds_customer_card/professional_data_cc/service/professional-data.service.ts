import { Phone } from './../../../../dto/client/Phone.dto';
import { ProofIncomeType } from './../../../../dto/client/ProofIncomeTypeDTO.dto';
import { IncomeType } from './../../../../dto/client/IncomeType.dto';
import { CompanySize } from './../../../../dto/client/EmployerSize.dto';
import { EconomicActivity } from './../../../../dto/client/EconomicActivity.dto';
import { EconomicActivityGroup } from './../../../../dto/client/EconomicActivityGroup.dto';
import { Province } from './../../../../../commons/province/dto/province.dto';
import { Profession } from './../../../../dto/client/Profession.dto';
import { Occupation } from './../../../../dto/client/Occupation.dto';
import { Company } from './../../../../dto/client/Company.dto';
import { Address } from './../../../../dto/client/Address.dto';
import { SimulationService } from './../../../../simulation.service';
import { AppMessage } from './../../../../../app.message';
import { AppService } from './../../../../../app.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';

@Injectable()
export class ProfessionalDataService {

    simulation: Simulation;
    listProvince: Object[] = [];
    listSizeCompany: Object[] = [];
    listEconomicActivityGroup: Object[] = [];
    listEconomicActivity: Object[] = [];
    listOccupation: Object[] = [];
    listPositionFunction: Object[] = [];
    listTypeOfIncome: Object[] = [];
    listTypeProofOfIncome: Object[] = [];
	isRequiredCNPJ: boolean = false;

    constructor(private appService: AppService, private appMessage: AppMessage, private simulationService: SimulationService) {
    };

    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_PROFESSIONAL_DATA)){
                this.onload(simulation);
            }
        });
    }

  private initializeFields(){
		if(!this.simulation.client.company) this.simulation.client.company = new Company();
        if(!this.simulation.client.company.address) this.simulation.client.company.address = new Address();

        if(!this.simulation.client.company.comercialPhone) this.simulation.client.company.comercialPhone = new Phone();
        if(!this.simulation.client.company.occupation) 
								this.simulation.client.company.occupation = new Occupation();
		if(!this.simulation.client.company.profession)
								this.simulation.client.company.profession = new Profession();
		if(!this.simulation.client.company.address.province) 
								this.simulation.client.company.address.province = new Province();
		if(!this.simulation.client.company.economicActivityGroup)
								this.simulation.client.company.economicActivityGroup = new EconomicActivityGroup();
		if(!this.simulation.client.company.economicActivity)
								this.simulation.client.company.economicActivity = new EconomicActivity();
		if(!this.simulation.client.company.size)
								this.simulation.client.company.size = new CompanySize();
		if(!this.simulation.client.company.incomeType)
								this.simulation.client.company.incomeType = new IncomeType();
		if(!this.simulation.client.company.proofIncomeType)
								this.simulation.client.company.proofIncomeType = new ProofIncomeType();
	}

    private onload(simulation: Simulation) {
        this.initializeFields();
        this.loadServices();
    }

    loadServices() {
        this.loadSizeCompany();
        this.loadEconomicActivityGroup();
        this.loadEconomicActivity();
        this.loadProvince();
        this.loadOccupation();
        this.loadPositionFunction();
        this.loadTypeOfIncome();
        this.loadTypeProofOfIncome();
    }



    loadOccupation() {
        let result = this.appService.xSearch('customerCardService', 'findAllOccupation')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listOccupation = response.listOccupation;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadProvince() {
        let result = this.appService.xSearch('customerCardService', 'findAllProvince')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listProvince = response.provinceList;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadPositionFunction() {
        let result = this.appService.xSearch('customerCardService', 'findAllProfession')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listPositionFunction = response.listProfession;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadSizeCompany() {
        let result = this.appService.xSearch('customerCardService', 'findAllEmployerSize')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listSizeCompany = response.listEmployerSize;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadEconomicActivityGroup() {
        let result = this.appService.xSearch('customerCardService', 'findAllIndustrialSegment')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listEconomicActivityGroup = response.listIndustrialSegment;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadEconomicActivity() {
        let result = this.appService.xSearch('customerCardService', 'findAllEconomicActivity')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listEconomicActivity = response.listEconomicActivity;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadTypeOfIncome() {
        let result = this.appService.xSearch('customerCardService', 'findAllIncomeType')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listTypeOfIncome = response.listIncomeType;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadTypeProofOfIncome() {
        let result = this.appService.xSearch('customerCardService', 'findAllProofIncomeType')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listTypeProofOfIncome = response.listProofIncomeType;
            },
            err => {
                console.log(err.json());
            }
        );
    }

}