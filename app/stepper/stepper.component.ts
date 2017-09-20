import { SimulationService } from './../simulation/simulation.service';
import { Simulation } from './../simulation/dto/Simulation.dto';
import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { AppService } from './../app.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StepEnum } from './../simulation/step.enum';

@Component({
  selector: 'stepper',
  templateUrl: './app/stepper/stepper.component.html'
})


export class StepperComponent implements OnChanges {

  @Input() steep: number;
  simulation: Simulation;

  @Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  count: number;


  leftIcon: String;
  leftText: String;
  rightIcon: String;
  rightText: String;
  stepFour: String;
  canNext: boolean;
  // @ViewChild('buttonChoiseVehicle') formClient;
  enabledNextStep: boolean;
  stepOne: any;
  browser: string;


  constructor(private simulationService: SimulationService) {
  };

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

  getStep(){
       return StepEnum;
  }

  change(toFront: boolean) {
    this.changeStep.emit(toFront);
  }


  ngOnChanges(changes: SimpleChanges) {

    switch (this.steep) {
      case StepEnum.STEP_CLIENT:
        this.rightIcon = 'directions_car';
        this.rightText = 'Editar <br>Veiculo';
        this.stepFour = 'stepNo';
        this.stepOne = document.body.getElementsByTagName('app-root')[0].getElementsByTagName('div')[0].getElementsByClassName("ng-invalid");
        // this.stepOne = document.body.getElementsByTagName('app-root')[0].getElementsByTagName('div')[0].getElementsByTagName('form');
        // this.stepOne = document.body.getElementsByTagName('app-root')[0].getElementsByTagName('div')[0].getElementsByTagName('form');
        // console.log(this.formClient);
      

        // this.stepOne = document.body.getElementsByTagName('app-root')[0].getElementsByTagName('div')[0].getElementsByClassName("ng-invalid")[0];
        if (this.stepOne.length > StepEnum.STEP_CLIENT) {
          this.enabledNextStep = true;
        } else {
          this.enabledNextStep = false;
        }
        // this.stepOne = this.formClient.nativeElement.parentElement.parentElement.get("#formClient");
        // console.log(this.stepOne);
        // let stepOne = document.getElementById("formClient").getElementsByTagName("div")[0].getElementsByClassName("ng-invalid")[0];
        // console.log(stepOne);

        break;
      case StepEnum.STEP_VEHICLE:
        this.leftIcon = 'person';
        this.leftText = 'Editar <br>Cliente';
        this.rightIcon = 'keyboard';
        this.rightText = 'Editar <br>Simulação';
        this.stepFour = 'stepNo';
        this.canNext = this.simulation.step2CanNext;

        break;
      case StepEnum.STEP_SIMULATION:
        this.leftIcon = 'directions_car';
        this.leftText = 'Editar <br>Veiculo';
        this.rightIcon = 'recent_actors';
        this.rightText = 'Ficha do  <br>Cliente';
        this.stepFour = 'stepNo';
        this.canNext = this.simulation.step3CanNext;
        break;
      case StepEnum.STEP_CUSTOMER_CARD:
        this.leftIcon = 'keyboard';
        this.leftText = 'Editar <br>Simulação';
        this.rightIcon = 'near_me';
        this.rightText = 'Enviar <br>Proposta';
        this.stepFour = 'stepNo';
        this.canNext = this.simulation.step4CanNext;
        break;
      case StepEnum.STEP_SEND:
        this.leftIcon = 'recent_actors';
        this.leftText = 'Voltar para<br>Ficha';
        this.rightIcon = 'description';
        this.rightText = 'Documentação<br>Disponível';
        this.stepFour = 'stepFour';
        this.canNext = this.simulation.step5CanNext;
        /**TODO Fazer a ligação do front com o Back */
        break;
      case StepEnum.STEP_DOCUMENT:
        this.leftIcon = 'description';
        this.leftText = 'Voltar para<br>Envio';
        this.stepFour = 'stepNo';
        this.canNext = this.simulation.step6CanNext;
        break;

      default:
        break;
    }
  }
}