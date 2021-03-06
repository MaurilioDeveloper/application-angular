import { Phone } from './../../../../dto/client/Phone.dto';
import { PoliticalExposition } from './../../../../dto/client/PoliticalExposition.dto';
import { BusinessRelashionshipType } from './../../../../dto/client/BusinessRelashionshipType.dto';
import { Guarantor } from './../../../../dto/client/Guarantor.dto';
import { Spouse } from './../../../../dto/client/Spouse.dto';
import { CivilState } from './../../../../dto/client/CivilState.dto';
import { AppService } from './../../../../../app.service';
import { KinshipType } from './../../../../dto/client/KinshipType.dto';
import { GuarantorType } from './../../../../dto/client/GuarantorType.dto';
import { IssuingBody } from './../../../../dto/client/IssuingBody.dto';
import { EducationDegree } from './../../../../dto/client/EducationDegree.dto';
import { Province } from './../../../../../commons/province/dto/province.dto';
import { Country } from './../../../../dto/client/Country.dto';
import { SimulationService } from './../../../../simulation.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';
import { TypePerson } from './../../../../dto/Client.dto';
import { DocumentType } from './../../../../dto/client/DocumentType.dto';



@Injectable()
export class GuarantorTwoClientService {
    
    simulation: Simulation;
    listCivilState: { 'id': null, 'description': null }[] = [];
	listCountry: Array<Country> = new Array<Country>();
	listProvince: Array<Province> = new Array<Province>();
	listSex: Object[] = [];
	listTypePhone: Object[] = [];
	listPoliticalExposition: Object[] = [];
	listEducationDegree: Array<EducationDegree> = new Array<EducationDegree>();
	listHandicapped: { 'status': boolean, 'description': String }[] = [];
	listDocumentType: Array<DocumentType> = new Array<DocumentType>();
	listIssuingBody: Array<IssuingBody> = new Array<IssuingBody>();
	listTypeGuarantor: Array<GuarantorType> = new Array<GuarantorType>();
	listDegreeOfKinship: Array<KinshipType>= new Array<KinshipType>();
	listCompanyRelationshipType: Object[] = [];
	isRequiredGuarantor: boolean = false;
    public countDigitsCpfCnpj: String;
    public isPhysicalPerson: boolean;    
    

    constructor(private appService: AppService, private simulationService: SimulationService) {
    }
    
	init() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
            this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_TWO_CLIENT)) {
			    this.onload();
            }
        });  
	}

   private initializeFields(){
        if(!this.simulation.client.civilState) this.simulation.client.civilState = new CivilState();
        if(!this.simulation.client.spouse) this.simulation.client.spouse = new Spouse();
        if(!this.simulation.client.guarantor2) this.simulation.client.guarantor2 = new Guarantor();
		if(!this.simulation.client.guarantor2.fixPhone) this.simulation.client.guarantor2.fixPhone = new Phone();
        if(!this.simulation.client.guarantor2.cellphone) this.simulation.client.guarantor2.cellphone = new Phone();
        if(!this.simulation.client.guarantor2.guarantorType) this.simulation.client.guarantor2.guarantorType = new GuarantorType();
        if(!this.simulation.client.guarantor2.kinshipType) this.simulation.client.guarantor2.kinshipType = new KinshipType();
        if(!this.simulation.client.guarantor2.businessRelashionshipType) 
                                        this.simulation.client.guarantor2.businessRelashionshipType = new BusinessRelashionshipType();
        if(!this.simulation.client.guarantor2.civilState) this.simulation.client.guarantor2.civilState = new CivilState();
        if(!this.simulation.client.guarantor2.country) this.simulation.client.guarantor2.country = new Country();
        if(!this.simulation.client.guarantor2.province) this.simulation.client.guarantor2.province = new Province();
        if(!this.simulation.client.guarantor2.politicalExposition) 
                                        this.simulation.client.guarantor2.politicalExposition = new PoliticalExposition();
        if(!this.simulation.client.guarantor2.province) this.simulation.client.guarantor2.province = new Province();
        if(!this.simulation.client.guarantor2.educationDegree) this.simulation.client.guarantor2.educationDegree = new EducationDegree();
        if(!this.simulation.client.guarantor2.documentType) this.simulation.client.guarantor2.documentType = new DocumentType()
        if(!this.simulation.client.guarantor2.countryDocument) this.simulation.client.guarantor2.countryDocument = new Country();
        if(!this.simulation.client.guarantor2.provinceDocument) this.simulation.client.guarantor2.provinceDocument = new Province();
        if(!this.simulation.client.guarantor2.issuingBodyDocument) this.simulation.client.guarantor2.issuingBodyDocument = new IssuingBody();
        
    }

	onload(){
        this.isPhysicalPerson = this.simulation.client.typePerson === TypePerson.PF;
        this.initializeFields();
		this.loadTypeGuarantor();
		this.loadDegreeOfKinship();
		this.loadCompanyRelationshipType();
		this.loadCivilState();
		this.loadCountry();
		this.loadSex();
		this.loadTypePhone();
		this.loadPoliticalExposition();
		this.loadEducationDegree();
		this.loadHandicapped();
		this.loadDocumentType();
		this.loadIssuingbody();
		this.loadProvince();
		this.validRequiredGuarantor();
	}

	loadTypeGuarantor() {
		let result = this.appService.xSearch('customerCardService', 'findAllGuarantorType')
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listTypeGuarantor = response.listGuarantorType;
			},
			err => {
				console.log(err.json());
			}
		);
	}

	loadDegreeOfKinship() {
		let result = this.appService.xSearch('customerCardService', 'findAllKinshipType')
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listDegreeOfKinship = response.listKinshipType;
			},
			err => {
				console.log(err.json());
			}
		);
	}

	loadCompanyRelationshipType() {
		let result = this.appService.xSearch('customerCardService', 'findAllBusinessRelationshipType')
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listCompanyRelationshipType = response.listBusinessRelationshipType;
			},
			err => {
				console.log(err.json());
			}
		);
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

    validRequiredGuarantor() {
		if (this.simulation.client.guarantor2.guarantorType.description != '') {
			this.simulation.client.guarantor2.isRequired = true;
		} else {
			this.simulation.client.guarantor2.isRequired = false;
		}
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

	hasGuarantor(guarantor : string): boolean {
		if(guarantor != "0") {
			return true;
		}
		return false;
	}
}