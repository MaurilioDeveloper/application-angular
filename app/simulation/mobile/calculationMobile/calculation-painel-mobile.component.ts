import { InstallmentsDialog } from './../../calculationPainel/calculationDialog/calculation/installmentsDialog/installments.dialog';
import { AppService } from './../../../app.service';
import { Calculation } from './../../dto/Calculation.dto';
import { Simulation } from './../../dto/Simulation.dto';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
	selector: 'calculationpainel-mobile',
	templateUrl: 'app/simulation/mobile/calculationMobile/calculation-painel-mobile.component.html',
	styleUrls: []
})
export class CalculationMobileComponent implements OnInit {

	private varBtnMarca: string = 'keyboard_arrow_up';
	private varBtnDrop: string = 'keyboard_arrow_down';
	private drop: boolean = false;
	private drop2: boolean = false;
	listInstallments: Object[];
	private browser;


	@Input() simulation: Simulation;
	@Input() calculation: Calculation;
	@Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
	calculationqta: Number;


	getProposalQuantity() {
		let observable = this.appService.xSearch('userProfile', 'proposalquantity');
		observable.subscribe(
			(data) => {
				let response = data.json();
				let qtaCalc = response.proposalQuantity;
				console.log(this.simulation.calculations)
				if (this.simulation.calculations && this.simulation.calculations.length > 1) {
					qtaCalc = this.simulation.calculations.length;
				}
			},
			err => {
				console.log(err.json());
			}
		);
	}


	installmentsDialog() {
		let dialogRef = this.dialog.open(InstallmentsDialog, { height: '85%', width: '50%' });
		dialogRef.componentInstance.simulation = this.simulation;
		console.log(this.listInstallments);
		dialogRef.afterClosed().subscribe(result => {
		});
	}


	change(go: boolean) {
		this.changeStep.emit(go);
	}

	constructor(private appService: AppService, public dialog: MdDialog) { }

	ngOnInit(): void {
		var ua = window.navigator.userAgent;
		var firefox = ua.indexOf('Firefox');

		if (firefox > 0) {
			// IE 10 or older => return version number
			this.browser = "firefox";
		}

		if (!this.simulation.calculations || this.simulation.calculations.length === 0) {
			this.simulation.calculations = [new Calculation];
			this.getProposalQuantity();
		} else {
			// libera botao
			this.simulation.step3CanNext = true;
		}

	}



	close() {

	}

	dados(listInstallments: Object[]) {
		console.log(listInstallments);
	}

}