import { GuarantorType } from './../../dto/client/GuarantorType.dto';
import { SimulationService } from './../../simulation.service';
import { Simulation } from './../../dto/Simulation.dto';
import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StepEnum } from './../../step.enum';

@Component({
  selector: 'stepper-mobile',
  templateUrl: './app/simulation/mobile/stepperMobile/stepper-mobile.component.html'
})


export class StepperMobileComponent implements OnChanges {

  simulation: Simulation;
  @Input() steep: number;
  @Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  private backStep: string;
  browser: string;

  constructor(private simulationService: SimulationService) {
  };

  change(toFront: boolean) {
    this.changeStep.emit(toFront);
  }

  ngOnInit() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE '); 
    if (msie > 0) {
      // IE 10 or older => return version number
      this.browser = "IE";
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      this.browser = "IE";
     
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      this.browser = "IE";
    }

      this.simulationService.load.subscribe(( simulation: Simulation ) => {
        this.simulation = simulation;
        if(this.simulation){
          this.onload();
        }
      }); 
  }

	private onload(){
  }

  ngOnChanges(changes: SimpleChanges) {
    switch (this.steep) {
      case StepEnum.STEP_CLIENT:
        this.backStep = 'lb-client';
        break;
      case StepEnum.STEP_VEHICLE:
        this.backStep = 'lb-edit-customer';
        break;
      case StepEnum.STEP_SIMULATION:
        this.backStep = 'lb-edit-vehicle';
        break;
      case StepEnum.STEP_CUSTOMER_CARD:
        this.backStep = 'lb-edit-simulation';
        break;
      case StepEnum.STEP_SEND:
        this.backStep = 'lb-back-to-customer-card';
        break;
      case StepEnum.STEP_DOCUMENT:
        this.backStep = 'lb-back-to-send';
        break;

      //Mobile
      case StepEnum.STEP_MOBILE_SUBMISSION:
        this.backStep = 'lb-simulation';
        break;
      case StepEnum.STEP_MOBILE_CLIENT_DATA:
        this.backStep = 'lb-submission';
        break;
      case StepEnum.STEP_MOBILE_ADDRESS_DATA:
        this.backStep = 'lb-customer-data';
        break;
      case StepEnum.STEP_MOBILE_SPOUSE:
        this.backStep = 'lb-residential-data';
        break;
      case StepEnum.STEP_MOBILE_PROFESSIONAL_DATA:
        if(this.simulation.client.civilState.description == "CASADO" || this.simulation.client.civilState.description == "COMPANHEIRO"){
          this.backStep = 'lb-spouse';
        }else{
          this.backStep = 'lb-residential-data';
        }
        break;
      case StepEnum.STEP_MOBILE_PERSON_DATA:
        this.backStep = 'lb-professional-data';
        break;
      case StepEnum.STEP_MOBILE_BANKING_REFENCES:
        this.backStep = 'lb-personal-references';
        break;
      case StepEnum.STEP_MOBILE_VEHICLE_DATA:
        this.backStep = 'lb-banking-references';
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_ONE_CLIENT: 
        this.backStep = 'lb-vehicle-data';
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_ONE_ADDRESS:
        this.backStep = 'lb-guarantor-data';
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_ONE_SPOUSE:
        this.backStep = 'lb-residential-data';
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_ONE_PROFESSIONAL:
        if(this.simulation.client.guarantor1.civilState.description == "CASADO" || this.simulation.client.guarantor1.civilState.description == "COMPANHEIRO"){
          this.backStep = 'lb-spouse';
        }else{
          this.backStep = 'lb-residential-data';
        }
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_ONE_PERSON:
        this.backStep = 'lb-professional-data';
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_ONE_BANKING:
        this.backStep = 'lb-personal-references';
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_TWO_CLIENT:
        // if(!this.simulation.client.guarantor2.guarantorType) {
        //     this.simulation.client.guarantor2.guarantorType = new GuarantorType();
        // }
        if(this.simulation.client.guarantor1.guarantorType.id == "0"){
          this.backStep = 'lb-guarantor-data';    
        }else {
          this.backStep = 'lb-banking-references';
        }
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_TWO_ADDRESS:
        this.backStep = 'lb-guarantor-data';
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_TWO_SPOUSE:
        this.backStep = 'lb-residential-data';
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_TWO_PROFESSIONAL:
        if(this.simulation.client.guarantor2.civilState.description == "CASADO" || this.simulation.client.guarantor2.civilState.description == "COMPANHEIRO"){
          this.backStep = 'lb-spouse';
        }else{
          this.backStep = 'lb-residential-data';
        }
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_TWO_PERSON:
        this.backStep = 'lb-professional-data';
        break;
      case StepEnum.STEP_MOBILE_GUARANTOR_TWO_BANKING:
        this.backStep = 'lb-personal-references';
        break;
      default: 
        this.backStep = 'lb-client';
        break;
    }

  }


  

}