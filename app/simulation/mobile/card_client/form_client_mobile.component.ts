/*import { Simulation } from './../../dto/Simulation.dto';
import { AppMessage } from './../../../app.message';

import { AppComponent } from './../../../app.component';
import { StepperComponent } from './../../../stepper/stepper.component';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef, OnChanges, ViewChildren, QueryList } from '@angular/core';
import { EmailValidator, FormGroup } from '@angular/forms';


@Component({
	selector: 'form-client-mobile',
	templateUrl: 'app/simulation/card_client/form_client.component.html',
})
export class FormClientComponent implements OnInit {
	@Input() simulation: Simulation;
	@Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
	@ViewChild('ff') ff: ElementRef;
	@ViewChild('emailElement') emailValid: ElementRef;
	@ViewChild('cpfcnpjElement') cpfcnpjValid: ElementRef;
	@ViewChild('phoneElement') phoneValid: ElementRef;
	@Input() cpfCnpj: string;

	private step: StepperComponent;
	private complexForm: FormGroup;
	private cpfcnpjClass;
	private phoneClass;
	private isViewInitialized: boolean = false;


	ngAfterViewInit() {
		this.isViewInitialized = true;
	}

	ngOnInit() {
		this.clientService.loadSalesType(this.simulation.saleType);
		this.clientService.loadProvinces(this.simulation);
		this.simulation.step2CanNext = false;
		if (!sessionStorage.getItem('salesman') && !this.simulation.vizualization) {
			this.clientService.verifyUser(this.simulation);
		}
	}

	constructor(private appComponent: AppComponent, private clientService: FormClientService, private appMessage: AppMessage) {
	};

	change(toFront: boolean) {
		this.changeStep.emit(toFront);
	}
	

	@HostListener('blur', ['$event'])
	blurEmail($event) {
		if (this.emailValid.nativeElement.className.indexOf('ng-invalid') != -1) {
			this.appMessage.showError("Campo E-mail inválido");
		}
	}

	validForm(valid) {
		if (this.isViewInitialized) {
			this.cpfcnpjClass = this.cpfcnpjValid.nativeElement.className.indexOf('ng-invalid');
			this.phoneClass = this.phoneValid.nativeElement.className.indexOf('ng-invalid');
		}
		if (valid && this.cpfcnpjClass == -1 && this.phoneClass == -1) {
			this.simulation.step1CanNext = true;
			return true
		}
		this.simulation.step1CanNext = false;
		return false;
	}


}*/