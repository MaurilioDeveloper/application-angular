import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CivilState } from './../../../../dto/client/CivilState.dto';
import { Client } from './../../../../dto/Client.dto';
import { SimulationService } from './../../../../simulation.service';
import { AppService } from './../../../../../app.service';
import { EconomicActivityGroup } from './../../../../dto/client/EconomicActivityGroup.dto';
import { EconomicActivity } from './../../../../dto/client/EconomicActivity.dto';
import { CompanySize } from './../../../../dto/client/EmployerSize.dto';
import { LegalNature } from './../../../../dto/client/LegaNature.dto';
import { IssuingBody } from './../../../../dto/client/IssuingBody.dto';
import { EducationDegree } from './../../../../dto/client/EducationDegree.dto';
import { PoliticalExposition } from './../../../../dto/client/PoliticalExposition.dto';
import { Phone } from './../../../../dto/client/Phone.dto';
import { Province } from './../../../../../commons/province/dto/province.dto';
import { Country } from './../../../../dto/client/Country.dto';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';
import { TypePerson } from './../../../../dto/Client.dto';
import { Address } from './../../../../dto/client/Address.dto';
import { DocumentType } from './../../../../dto/client/DocumentType.dto';


@Injectable()
export class ClientCustomerService {

    simulation: Simulation;
    listCivilState: { 'id': null, 'description': null }[] = [];
    listCountry: Array<Country> = new Array<Country>();
    listProvince: Array<Province> = [];
    listSex: Object[] = [];
    listTypePhone: Array<Phone> = [];
    listPoliticalExposition: Array<PoliticalExposition> = new Array<PoliticalExposition>();
    listEducationDegree: Array<EducationDegree> = new Array<EducationDegree>();
    listHandicapped: { 'status': boolean, 'description': String }[] = [];
    listDocumentType: Array<DocumentType> = new Array<DocumentType>();
    listIssuingBody: Array<IssuingBody> = new Array<IssuingBody>();
    listLegalNature: Array<LegalNature> = new Array<LegalNature>();
    listSizeCompany: Array<CompanySize> = new Array<CompanySize>();
    listOwnSeat: { 'status': boolean, 'description': String }[] = [];
    listEconomicActivityGroup: Array<EconomicActivityGroup> = new Array<EconomicActivityGroup>();
    listEconomicActivity: Array<EconomicActivity> = new Array<EconomicActivity>();
    public isPhysicalPerson: boolean;
    public countDigitsCpfCnpj: String;





    constructor(private appService: AppService, private simulationService: SimulationService) {
    }

    private initializeFields(){
        //COMUM
        if(!this.simulation.client.address) this.simulation.client.address = new Address();
        
        //PF
        if (this.isPhysicalPerson) {
            if(!this.simulation.client.civilState) this.simulation.client.civilState = new CivilState();
            if(!this.simulation.client.province) this.simulation.client.province = new Province();
            if(!this.simulation.client.country) this.simulation.client.country = new Country();
            if(!this.simulation.client.countryDocument) this.simulation.client.countryDocument = new Country();
            if(!this.simulation.client.politicalExposition) this.simulation.client.politicalExposition = new PoliticalExposition();
            if(!this.simulation.client.educationDegree) this.simulation.client.educationDegree = new EducationDegree();
            if(!this.simulation.client.provinceDocument)  this.simulation.client.provinceDocument = new Province();
            if(!this.simulation.client.documentType) this.simulation.client.documentType = new DocumentType();
            if(!this.simulation.client.issuingBody) this.simulation.client.issuingBody = new IssuingBody();
        }else{
            //PJ
            if(!this.simulation.client.legalNature) this.simulation.client.legalNature = new LegalNature();
            if(!this.simulation.client.address.province) this.simulation.client.address.province = new Province(); 
            if(!this.simulation.client.companySize) this.simulation.client.companySize = new CompanySize();
            if(!this.simulation.client.economicActivityGroup) this.simulation.client.economicActivityGroup = new EconomicActivityGroup();
            if(!this.simulation.client.economicActivity) this.simulation.client.economicActivity = new EconomicActivity();
        }
    }


    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if (this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_CLIENT_DATA)) {
                this.onload();
            }
        });

        
    }

    private onload() {
        this.isPhysicalPerson = this.simulation.client.typePerson === TypePerson.PF;

        this.initializeFields();

        if (this.isPhysicalPerson) {
            this.loadCountry();
            this.loadCivilState();
            this.loadSex();
            this.loadTypePhone();
            this.loadPoliticalExposition();
            this.loadEducationDegree();
            this.loadHandicapped();
            this.loadDocumentType();
            this.loadIssuingbody();
        } else {
            this.loadLegalnature();
            this.loadSizeCompany();
            this.loadOwnSeat();
            this.loadEconomicActivityGroup();
            this.loadEconomicActivity();
        }
        this.loadProvince();
    }

    loadCivilState() {
        let result = this.appService.xSearch('customerCardService', 'findAllCivilState')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listCivilState = response.listCivilState;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadCountry() {
        let result = this.appService.xSearch('customerCardService', 'findAllCountry')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listCountry = response.listCountry;
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

    loadSex() {
        let result = this.appService.xSearch('customerCardService', 'findAllPersonType')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listSex = response.listPersonType;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadTypePhone() {
        let result = this.appService.xSearch('customerCardService', 'findAllPhoneType')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listTypePhone = response.listPhoneType;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadPoliticalExposition() {
        let result = this.appService.xSearch('customerCardService', 'findAllPoliticalExposition')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listPoliticalExposition = response.listPoliticalExposition;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadEducationDegree() {
        let result = this.appService.xSearch('customerCardService', 'findAllEducationDegree')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listEducationDegree = response.listEducationDegree;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadHandicapped() {
        let sim = { 'status': true, 'description': 'SIM' }
        let nao = { 'status': false, 'description': 'NAO' }
        this.listHandicapped.push(sim);
        this.listHandicapped.push(nao);
    }

    loadDocumentType() {
        let result = this.appService.xSearch('customerCardService', 'findAllDocumentType')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listDocumentType = response.listDocumentType;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadIssuingbody() {
        let result = this.appService.xSearch('customerCardService', 'findAllEmissionOrganism')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listIssuingBody = response.listEmissionOrganism;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadLegalnature() {
        let result = this.appService.xSearch('customerCardService', 'findAllLegalNature')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listLegalNature = response.listLegalNature;
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

    loadOwnSeat() {
        let sim = { 'status': true, 'description': 'SIM' }
        let nao = { 'status': false, 'description': 'NAO' }
        this.listOwnSeat.push(sim);
        this.listOwnSeat.push(nao);
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

    hasSpouse(civilStateSelectedId : string) : boolean{
        for(let civilState of this.listCivilState){
            if(civilStateSelectedId === civilState.id){
                if(civilState.description === 'CASADO' || civilState.description === 'COMPANHEIRO' ){
                    return true;
                }
                return false;
            }
        }
    }    
}