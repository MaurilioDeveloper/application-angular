import { DegreeKinshipDialog } from './../degreeKinshipDialog/degreeKinshipDialog.dialog';
import { MdDialog } from '@angular/material';
import { GuarantorOneClientService } from './../service/guarantor-1-client.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Component, Input } from '@angular/core';
import { SpouseType } from './../../../../dto/client/SpouseType.enum';
import { StepEnum } from './../../../../step.enum';


@Component({
	selector: 'guarantor-1-client-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_client_cc/mobile/guarantor-1-client-mobile-cc.component.html',
    providers: [GuarantorOneClientService]
})
export class GuarantorOneClientMobileComponent {

    @Input() controlDynamicStepsIn: number;
    @Output() countClient: EventEmitter<number> = new EventEmitter<number>();
    @Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
    @Output() changeSpouseGuarantor1: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() changeGuarantor1: EventEmitter<boolean> = new EventEmitter<boolean>();
    isRequiredGuarantor: boolean = false;

    private SPOUSE_KINSHIP: string = '02';

    conf: boolean = false;

    constructor(private guarantorOneClientService: GuarantorOneClientService, public dialog: MdDialog) {
		this.guarantorOneClientService.init();
	};

    ngOnInit() {
		if(!this.getSimulation().client.guarantor1.guarantorType.id) {
			this.getSimulation().client.guarantor1.guarantorType.id = "0";
        } 
    }

    getListCivilState(): Object[] {
		return this.guarantorOneClientService.listCivilState;
	}

	getListCountry(): Object[] {
		return this.guarantorOneClientService.listCountry; 
	}

	getListProvince(): Object[] {
		return this.guarantorOneClientService.listProvince;
	}

	getListSex(): Object[] {
		return this.guarantorOneClientService.listSex;
	}

	getListTypePhone(): Object[] {
		return this.guarantorOneClientService.listTypePhone;
	}

	getListPoliticalExposition(): Object[] {
		return this.guarantorOneClientService.listPoliticalExposition;
	}

	getListEducationDegree(): Object[] {
		return this.guarantorOneClientService.listEducationDegree;
	}

	getListHandicapped(): Object[] {
		return this.guarantorOneClientService.listHandicapped;
	}

	getListDocumentType(): Object[] {
		return this.guarantorOneClientService.listDocumentType;
	}

	getListIssuingBody(): Object[] {
		return this.guarantorOneClientService.listIssuingBody;
	}

	getListTypeGuarantor(): Object[] {
		return this.guarantorOneClientService.listTypeGuarantor;
	}

	getListDegreeOfKinship(): Object[] {
		return this.guarantorOneClientService.listDegreeOfKinship;
	}

	getListCompanyRelationshipType(): Object[] {
		return this.guarantorOneClientService.listCompanyRelationshipType;
	}

	getIsPhysicalPerson(): boolean {
		return this.guarantorOneClientService.isPhysicalPerson;
	}

	getSimulation(): Simulation {
		return this.guarantorOneClientService.simulation;
	}
	
    validRequiredGuarantor() {
		this.guarantorOneClientService.validRequiredGuarantor();
	}

	validDegreeKinship(item: String) {
		if (this.getSimulation().client.civilState.value === SpouseType.MARRIED ||
			this.getSimulation().client.civilState.value === SpouseType.LIFE_PARTNER) {
			if (this.getSimulation().client.guarantor1.kinshipType.importCode === this.SPOUSE_KINSHIP) {
				let dialogRef = this.dialog.open(DegreeKinshipDialog, { width: '70%' });
				dialogRef.afterClosed().subscribe(result => {
					if (dialogRef.componentInstance.confirm) {
						this.guarantorOneClientService.copySpouseToGuarantorClient();
						this.getSimulation().client.guarantor1.copySpouseEnabled = true;
					} else {
						this.getSimulation().client.guarantor1.copySpouseEnabled = false;
					}
				});
			} else {
				this.getSimulation().client.guarantor1.copySpouseEnabled = false;
			}
		}
	}

	changeSpouseData(){
		this.guarantorOneClientService.changeSpouseData();
	} 

	onChangeSpouse(event) {
        this.changeSpouseGuarantor1.emit(
				this.guarantorOneClientService.hasSpouse(event.value));
	}

	selectGuarantorType(event) {
		this.changeGuarantor1.emit(this.guarantorOneClientService.hasGuarantor(event.value));
	}

    nextStep() {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }

        this.controlDynamicStepsIn = 10;
		if(this.getSimulation().client.guarantor1.guarantorType.id == "0") {
			this.getSimulation().step = StepEnum.STEP_MOBILE_GUARANTOR_TWO_CLIENT;	
		} else {
        	this.getSimulation().step++;
		}
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    }


}