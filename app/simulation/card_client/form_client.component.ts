import { FormClientService } from './service/form-client.service';
import { Subscription } from 'rxjs/Subscription';
import { SimulationService } from './../simulation.service';
import { ObservableMedia } from '@angular/flex-layout';
import { AppComponent } from './../../app.component';
import { SalesmanStructure } from './../dto/SalesmanStructure.dto.';
import { AppMessage } from './../../app.message';
import { SelectedSalesmanDialog } from './../selected_salesman_dialog/selectedSalesman.dialog';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SaleType } from './../dto/SaleType.dto';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../login/auth.service';
import { Province } from './../../commons/province/dto/province.dto';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { StepperComponent } from './../../stepper/stepper.component';
import { Simulation } from './../dto/Simulation.dto';
import { Car } from './../dto/Car.dto';
import { Client, TypePerson } from './../dto/Client.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef, OnChanges, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Salesman } from "../selected_salesman_dialog/dto/salesman.dto";


@Component({
	selector: 'form-client',
	templateUrl: 'app/simulation/card_client/form_client.component.html',
	providers: [FormClientService]
})
export class FormClientComponent implements OnInit, OnDestroy {
	
	@Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
	@ViewChild('ff') ff: ElementRef;
	@ViewChild('emailElement') emailValid: ElementRef;
	@ViewChild('cpfcnpjElement') cpfcnpjValid: ElementRef;
	@ViewChild('phoneElement') phoneValid: ElementRef;

	private step: StepperComponent;
	//ID FIXO DA BASE DE DADOS
	private complexForm: FormGroup;
	private cpfcnpjClass;
	private phoneClass;
	private isViewInitialized: boolean = false;
	private forceClose = false;

	private SEMI_NOVOS = 2;

	constructor(private appMessage: AppMessage, private media: ObservableMedia, private formClientService: FormClientService) {
		this.formClientService.init();
	};

	ngOnInit() {
	}

	getSimulation(): Simulation {
		return this.formClientService.simulation;
	}

	getListSaleType(): Object[] {
		return this.formClientService.listSaleType;
	}

	getListProvinces(): Object[] {
		return this.formClientService.listProvinces;
	}


	changeSaleType(event: any) {
		let saleType = event.value.value;
		if (saleType === this.SEMI_NOVOS) {
			if (this.getSimulation().car && !this.getSimulation().showNewOnes) {
				this.getSimulation().car = undefined;
			}
			this.getSimulation().showNewOnes = true;
		} else {
			this.getSimulation().showNewOnes = false;
		}
	}


	ngAfterViewInit() {
		this.isViewInitialized = true;
	}


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
			this.getSimulation().step1CanNext = true;
			return true
		}
		this.getSimulation().step1CanNext = false;
		return false;
	}



	ngOnDestroy() {
		if (this.formClientService.dialogRef) {
			this.forceClose = true;
			this.formClientService.dialogRef.close();
		}
	}
}