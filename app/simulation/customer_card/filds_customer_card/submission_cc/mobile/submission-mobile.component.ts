import { CertifiedAgent } from './../../../../dto/client/CertifiedAgent.dto';
import { SubmissionService } from './../service/submission.service';
import { SimulationService } from './../../../../simulation.service';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'submission-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/submission_cc/mobile/submission-mobile.component.html',
	providers: [SubmissionService]
})

export class SubmissionMobileComponent {

	conf: boolean = false;

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();

	@Input() steep: number;

	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();

	constructor(private submissionService: SubmissionService) {
		this.submissionService.init();
	};

	ngOnInit() {
	}

	getSimulation(): Simulation {
		return this.submissionService.simulation;
	}

	getListCertifiedAgent(): Object[] {
		return this.submissionService.listCertifiedAgent;
	}

	getCertifiedAgentSelected() {
		return this.submissionService.certifiedAgentSelected;
	}

	nextStep() {
		if (!this.conf) {
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 2;
		this.getSimulation().step++;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}
}