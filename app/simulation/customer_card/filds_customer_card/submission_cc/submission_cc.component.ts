import { CertifiedAgent } from './../../../dto/client/CertifiedAgent.dto';
import { SubmissionService } from './service/submission.service';
import { SimulationService } from './../../../simulation.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'submission-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/submission_cc/submission_cc.component.html',
	providers: [SubmissionService]
})
export class SubmissionCustomerCardComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();

	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	conf: boolean = false;

	constructor(private submissionService: SubmissionService) {
		this.submissionService.init();
	};

	ngOnInit() {
	}

	getSimulation(): Simulation {
		return this.submissionService.simulation;
	}

	getListCertifiedAgent(): CertifiedAgent[] {
		return this.submissionService.listCertifiedAgent;
	}
	
	getCertifiedAgentSelected(){
		return this.submissionService.certifiedAgentSelected;
	}
	
	nextStep() {
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 2;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}