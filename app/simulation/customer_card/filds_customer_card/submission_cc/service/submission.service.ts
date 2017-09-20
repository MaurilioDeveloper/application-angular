import { CertifiedAgent } from './../../../../dto/client/CertifiedAgent.dto';
import { Simulation } from './../../../../dto/Simulation.dto';
import { SimulationService } from './../../../../simulation.service';
import { AppService } from "../../../../../app.service";
import { StepEnum } from './../../../../step.enum';
import { Injectable } from '@angular/core';


@Injectable()
export class SubmissionService  {

    simulation: Simulation;
	listCertifiedAgent : Array<CertifiedAgent>;
	certifiedAgentSelected : CertifiedAgent;

    constructor(private appService: AppService, private simulationService : SimulationService) {
    }
    
	init() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
            this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_SUBMISSION)){
			    this.onload();
            }
        });  
	}

	onload(){
		this.loadNameCertifidAgent();
	}


    loadNameCertifidAgent() {
       this.certifiedAgentSelected = new CertifiedAgent();

        let observable = this.appService.xSearchWithData('customerCardService/findCertifiedAgentFromSantander', new Object());
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.listCertifiedAgent = response.certifiedAgenteDTOList;
                let certifiedAgentId = this.simulation.certifiedAgent;
                let resultFilter = this.listCertifiedAgent.filter(certifiedAgent =>certifiedAgent.id === certifiedAgentId);
                
                //Caso a simulação já tenha um agente certificado
                if(resultFilter[0]){
                    this.certifiedAgentSelected = resultFilter[0];
                    this.simulation.certifiedAgent = resultFilter[0].id
                }else{
                    //Caso possua somente um registro, será selecionado automaticamente
                    if (this.listCertifiedAgent.length == 1) {
                        this.certifiedAgentSelected = this.listCertifiedAgent[0];
                        this.simulation.certifiedAgent = this.listCertifiedAgent[0].id;
                    }
                }

            },
            err => {
                console.log(err.json());
            }
        );
    }


}