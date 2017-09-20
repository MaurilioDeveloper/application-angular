import { SendSimulationDialog } from './send_simulation_dialog/send_simulation.dialog';
import { MdDialogRef } from '@angular/material';
import { AppMessage } from './../../app.message';
import { AppService } from './../../app.service';
import { Phone } from './../dto/client/Phone.dto';
import { MailingAddress } from './../dto/client/MailingAddress.dto';
import { ResidenceType } from './../dto/client/ResidenceType.dto';
import { Address } from './../dto/client/Address.dto';
import { Province } from './../../commons/province/dto/province.dto';
import { Version } from './../dto/Version.dto';
import { StepperComponent } from './../../stepper/stepper.component';
import { Simulation } from './../dto/Simulation.dto';
import { SimulationService } from './../simulation.service';
import { Injectable } from '@angular/core';
import { SpouseType } from './../dto/client/SpouseType.enum';
import { StepEnum } from './../step.enum';
import { TypePerson } from './../dto/Client.dto';
import { MdDialog } from '@angular/material';

@Injectable()
export class CustomerCardService {

    simulation: Simulation;
    private step: StepperComponent;
    controlDynamicSteps: number;
    public countDigitsCpfCnpj: String;
    public isPhysicalPerson: boolean;
    public typePerson: String;
    public showSpouse : boolean;
    public showSpouseGuarantor1 : boolean;
    public showSpouseGuarantor2 : boolean;
    public showGuarantor1: boolean;
    public showGuarantor2: boolean;


    constructor(private simulationService: SimulationService, private appService: AppService, 
                    private appMessage: AppMessage, private dialog: MdDialog) {
    }


    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
			this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_SUBMISSION)) {
			    this.onload();
            }
        });
    }

    private onload() {
        if(this.simulation.client.civilState){
            this.showSpouse = this.hasSpouse(this.simulation.client.civilState.description);
        }
        if(this.simulation.client.guarantor1 && this.simulation.client.guarantor1.civilState){
            this.showSpouseGuarantor1 = this.hasSpouse(this.simulation.client.guarantor1.civilState.description);
        }
        if(this.simulation.client.guarantor2 && this.simulation.client.guarantor2.civilState){
            this.showSpouseGuarantor2 = this.hasSpouse(this.simulation.client.guarantor2.civilState.description);
        }
        if(this.simulation.client.guarantor1 && this.simulation.client.guarantor1.guarantorType) {
            this.showGuarantor1 = this.hasGuarantor(this.simulation.client.guarantor1.guarantorType.id);
        }
        if(this.simulation.client.guarantor2 && this.simulation.client.guarantor2.guarantorType) {
            this.showGuarantor2 = this.hasGuarantor(this.simulation.client.guarantor2.guarantorType.id);
        }

        this.isPhysicalPerson = this.simulation.client.typePerson === TypePerson.PF;
        this.controlDynamicSteps = 1;

    }

    hasSpouse(civilState): boolean{
        return civilState == 'CASADO' || civilState == 'COMPANHEIRO';
    }

    
    hasGuarantor(guarantor): boolean{
        return guarantor != "0";
    }


    isSpouseClient(): boolean {

        if (this.simulation.client.civilState != null) {
            return (this.simulation.client.civilState.value == SpouseType.MARRIED ||
                this.simulation.client.civilState.value == SpouseType.LIFE_PARTNER)
        } else {
            return true;
            //return false;
        }

    }

    isSpouseGuarantor1(): boolean {
        if (this.simulation.client.guarantor1.civilState != null) {
            return (this.simulation.client.guarantor1.civilState.value == SpouseType.MARRIED ||
                this.simulation.client.guarantor1.civilState.value == SpouseType.LIFE_PARTNER)
        } else {
            return false;
        }
    }

    isSpouseGuarantor2(): boolean {
        if (this.simulation.client.guarantor2.civilState != null) {
            return (this.simulation.client.guarantor2.civilState.value == SpouseType.MARRIED ||
                this.simulation.client.guarantor2.civilState.value == SpouseType.LIFE_PARTNER)
        } else {
            return false;
        }
    }

    verifyPhysicalSpouseGuarantor() {
        if(this.isPhysicalPerson && this.showSpouseGuarantor1 && this.showGuarantor1) {return true}
        return false;

    }

    verifyPhysicalSpouseGuarantor2() {
        if(this.isPhysicalPerson && this.showSpouseGuarantor2 && this.showGuarantor2) {return true}
        return false
    }

    saveDossier() {
        let dossier = {simulation : this.simulation};
        let saveDossierService = this.appService.xSearchWithData('savesimulation/savesimulation', dossier);
        saveDossierService.subscribe(
            (data) => {
                let response = data.json();
                this.appMessage.showDefaultSuccess();
                let dialogRef = this.dialog.open(SendSimulationDialog, { width: '40%' });

                //caso o usuario confirme a envio para o Santander
                dialogRef.afterClosed().subscribe(result => {
                   if(result){
                       this.sendSantander();
                   }
                });
            },
            err => {
                console.log(err.json());
            }
        );
    }

    private sendSantander(){
		 if (this.simulation.id) {
            let send = new Object;
            send["dossierId"] = this.simulation.id
            let specialget = this.appService.xPost('santanderService/sendDossierSantander', send);
            specialget.subscribe(
                (data) => {
                    this.appMessage.showDefaultSuccess();
                },
                err => {
                
                }
            );
        }
	}

