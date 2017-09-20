import { Simulation } from './../../dto/Simulation.dto';
import { ObservableMedia } from '@angular/flex-layout';
import { StepperComponent } from './../../../stepper/stepper.component';
import { CustomerCardService } from './../customer-card.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';


@Component({
	selector: 'customer-card-mobile',
	templateUrl: 'app/simulation/customer_card/mobile/customer_card-mobile.component.html',
	styleUrls: ['app/simulation/customer_card/customer_card.component.css'],
	providers: [CustomerCardService]
})
export class CustomerCardMobileComponent implements OnInit {

	@Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();

	private step: StepperComponent;

	count: number = 0;

	private varBtnMarca: string = 'keyboard_arrow_up';
	private varBtnDrop: string = 'keyboard_arrow_up';
	private drop: boolean = false;
	private drop2: boolean = false;


	constructor(public media: ObservableMedia, private customerCardService: CustomerCardService) {
	};

	ngOnInit() {
		this.customerCardService.init();
		this.getSimulation().step = 6;
	}

	getSimulation(): Simulation {
		return this.customerCardService.simulation;
	}

	isPhysicalPerson(): boolean {
		return this.customerCardService.isPhysicalPerson;
	}



	countClient() {
		this.count += 1;
		if (this.count >= 15) {
			this.getSimulation().step4CanNext = true;
		} else {
			this.getSimulation().step4CanNext = false;
		}
	}

	getControlDynamicSteps(): number {
		if (this.customerCardService.controlDynamicSteps === undefined) {
			this.customerCardService.controlDynamicSteps = 1;
			return this.customerCardService.controlDynamicSteps;
		}
		return this.customerCardService.controlDynamicSteps;
	}

	isSpouseClient() {
		this.customerCardService.isSpouseClient;
	}

	clicked() {
		if (this.drop) {
			this.drop = false;
			this.varBtnMarca = 'keyboard_arrow_down';
		} else {
			this.drop = true;
			this.varBtnMarca = 'keyboard_arrow_up';
		}
	}

	hide() {
		if (this.drop2) {
			this.drop2 = false;
			this.varBtnDrop = 'keyboard_arrow_down';
		} else {
			this.drop2 = true;
			this.varBtnDrop = 'keyboard_arrow_up';
		}
	}

	controlDynamicStepsM(dynamicSteps: number) {
		this.customerCardService.controlDynamicSteps = dynamicSteps;
	}


	returnToStep(step: number) {
		this.customerCardService.controlDynamicSteps = step;
	}


	changeSpouse(value: boolean) {
		this.customerCardService.showSpouse = value;
	}

	getShowSpouse(): boolean {
		return this.customerCardService.showSpouse;
	}

	changeSpouseGuarantor1(value: boolean) {
		this.customerCardService.showSpouseGuarantor1 = value;
	}

	getShowSpouseGuarantor1(): boolean {
		return this.customerCardService.showSpouseGuarantor1;
	}

	changeSpouseGuarantor2(value: boolean) {
		this.customerCardService.showSpouseGuarantor2 = value;
	}
	getShowSpouseGuarantor2(): boolean {
		return this.customerCardService.showSpouseGuarantor2;
	}

	changeGuarantor1(value: boolean) {
		this.customerCardService.showGuarantor1 = value;
	}

	getShowGuarantor1(): boolean {
		return this.customerCardService.showGuarantor1;
	}

	changeGuarantor2(value: boolean) {
		this.customerCardService.showGuarantor2 = value;
	}

	getShowGuarantor2(): boolean {
		return this.customerCardService.showGuarantor2;
	}

	getVerifyPhysicalSpouseGuarantor1(): boolean {
		return this.customerCardService.verifyPhysicalSpouseGuarantor();
	}

	getVerifyPhysicalSpouseGuarantor2(): boolean {
		return this.customerCardService.verifyPhysicalSpouseGuarantor2();
	}

	saveDossier() {
		this.customerCardService.saveDossier();
	}


}