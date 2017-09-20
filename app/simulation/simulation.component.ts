import { SimulationService } from './simulation.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SalesmanStructure } from './dto/SalesmanStructure.dto.';
import { Salesman } from './selected_salesman_dialog/dto/salesman.dto';
import { AppComponent } from './../app.component';
import { Province } from './../commons/province/dto/province.dto';
import { AppService } from './../app.service';
import { SaleType } from './dto/SaleType.dto';
import { State } from './dto/State.dto';
import { Client } from './dto/Client.dto';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Simulation } from './dto/Simulation.dto';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperComponent } from './../stepper/stepper.component';
import { ExitSalesmanDialog } from './exit_salesman_dialog/exitSalesmanDialog.dialog';
import { AuthService } from './../login/auth.service';
import { Phone } from './dto/client/Phone.dto';
import { AppMessage } from './../app.message';
import { ObservableMedia } from "@angular/flex-layout";
import { Address } from "./dto/client/Address.dto";
import { StepEnum } from "./step.enum";

@Component({
    selector: 'simulation',
    templateUrl: './app/simulation/simulation.component.html'
})

export class SimulationComponent implements OnInit {

    simulation: Simulation;

    constructor(
        private activeRoute: ActivatedRoute, private router: Router, private appService: AppService,
        private appComponent: AppComponent, public media: ObservableMedia, public dialog: MdDialog, 
        private authService: AuthService, private appMessage: AppMessage, private simulationService: SimulationService) {
    };

    ngOnInit() {
        this.activeRoute
            .params
            .subscribe(params => {
                this.simulation = new Simulation();
                this.simulation.id = params['id'] || undefined;
            });

        if (this.simulation.id) {
            // consultar o dossier
            this.getDossier();
        } else {
            this.keepSalesmanStructure();
        }
        this.simulationService.setSimulation(this.simulation);
    }

    getStep(){
        return StepEnum;
    }

    keepSalesmanStructure() {
        let option = sessionStorage.getItem('salesman');
        if (option != null) {
            let salesman = JSON.parse(sessionStorage.getItem('salesman'));
            this.simulation.salesmanStructure = new SalesmanStructure;
            this.simulation.salesmanStructure.salesmanId = salesman.id;
            this.simulation.salesmanStructure.salesmanName = salesman.name;
            let observable = this.appService.xSearchWithData('structureService/questDealershipBySallesmanUser', {});
            observable.subscribe(
                (data) => {
                    let response = data.json();
                    this.authService.setStructure(response.structure.structureId);
                    let structure = response.structure;
                    if (structure != null) {
                        this.simulation.salesmanStructure.structureId = structure.structureId != null ? structure.structureId : '';
                        this.simulation.salesmanStructure.structureDescription = structure.description;
                    }
                },
                err => {
                    console.log(err.json());
                }
            );
        }
    }

    loadSalesman() {
        let observable = this.appService.xSearch('simulation/salesman', this.simulation.id);
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.authService.setSalesMan(new Salesman(response.salesman.id, response.salesman.name));
                let salesman = JSON.parse(sessionStorage.getItem('salesman'));
                this.simulation.salesmanStructure = new SalesmanStructure;
                this.simulation.salesmanStructure.salesmanId = salesman.id;
                this.simulation.salesmanStructure.salesmanName = salesman.name;
                this.keepSalesmanStructure();
        });
    }

    changeStep(toFront: boolean) {
        if (this.simulation.step < StepEnum.STEP_CLIENT) {
             return
        }
        
        if(this.simulation.step == 6) {
            this.simulation.step = 3;
        }

        if (toFront) {
            this.simulation.step++;
        } else {
            if(this.simulation.client.civilState){
                if((this.simulation.client.civilState.description != "CASADO" 
                && this.simulation.client.civilState.description != "COMPANHEIRO"
                && this.simulation.step == StepEnum.STEP_MOBILE_PROFESSIONAL_DATA)){
                    this.simulation.step--;
                }
                if(this.simulation.client.guarantor1){
                    if((this.simulation.client.guarantor1.civilState.description != "CASADO" 
                    && this.simulation.client.guarantor1.civilState.description != "COMPANHEIRO"
                    && this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_ONE_PROFESSIONAL)){
                        this.simulation.step--;
                    }
                }

                if(this.simulation.client.guarantor2) {
                    if((this.simulation.client.guarantor2.civilState.description != "CASADO" 
                    && this.simulation.client.guarantor2.civilState.description != "COMPANHEIRO"
                    && this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_TWO_PROFESSIONAL)){
                        this.simulation.step--;
                    }
                }

                if(this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_TWO_CLIENT 
                    && this.simulation.client.guarantor1.guarantorType.id == "0"){
                        this.simulation.step = StepEnum.STEP_MOBILE_GUARANTOR_ONE_CLIENT + 1;
                    }
            }
            this.simulation.step--;
        }
    }


    sendByEmail(dossierId: string) {
        let urlStr = "sendEmail/" + dossierId + "/" + this.appComponent.theme;
        let sendEmail = this.appService.xSearch("proposalService", urlStr);
        sendEmail.subscribe(
            err => {
                console.log(err.json());
            }
        );
    }

    print(dossierId: string) {
        let urlStr = "print/" + dossierId + "/" + this.appComponent.theme;
        this.appService.xFileDownload("proposalService", urlStr, "FILE", "pdf");
    }

    openDialog() {
        let dialogRef = this.dialog.open(ExitSalesmanDialog, { width: '50%' });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result => {
            if (dialogRef.componentInstance.confirm) {
                let item = {};
                let theme = "";
                theme = JSON.parse(sessionStorage.getItem('oldTheme'));
                item["value"] = theme;
                this.appComponent.changeTheme(item);
                this.router.navigateByUrl('/home');
            }
        });
    }

    getDossier() {
        let searchDossier = this.appService.xSearch('myProposal/dossier', this.simulation.id);
        searchDossier.subscribe(
            (data) => {
                let response = data.json();
                if (response.msgSantander) {
                    this.appMessage.showWarning(response.msgSantander);
                    console.log("ERRO NA ATUALIZAÇÂO DO SANTANDER [" + response.msgErrorSantander + "]");
                }

                this.simulation.id = response.simulation.id;
                this.simulation.car = response.simulation.car;
                this.simulation.client = response.simulation.client;
                this.simulation.saleType = response.simulation.saleType;
                this.simulation.tc = response.simulation.tc;
                this.simulation.vizualization = response.simulation.vizualization;
                this.simulation.brand = response.simulation.brand;
                this.simulation.calculations = response.simulation.calculations;
                this.simulation.specialTypes = response.simulation.specialTypes;
                this.simulation.isShowRoomSemiNews = response.simulation.isShowRoomSemiNews;
                this.simulation.showNewOnes = response.simulation.showNewOnes;
                this.simulation.dossierNumber = response.simulation.dossierNumber;
                this.simulation.calculationSelected = response.simulation.calculationSelected;
                this.simulation.certifiedAgent = response.simulation.certifiedAgent;
                this.simulation.showBtnSave = true;
                this.simulation.step = response.step;
                this.loadSalesman();
            },
            err => {
                this.router.navigate(['/home']);
            }
        );
    }

    saveDossier() {
        let dossier = {simulation : this.simulation};
        let saveDossierService = this.appService.xSearchWithData('savesimulation/savesimulation', dossier);
        saveDossierService.subscribe(
            (data) => {
                let response = data.json();
                this.appMessage.showSuccess('Seu trabalho está salvo');
                this.router.navigate(['./simulation/' + response.idSimulation]);
            },
            err => {
                console.log('================ MICHEL SAVE DOSSIER ERRO ================');
                console.log(err.json());
            }
        );
    }

    ngOnDestroy(){
        this.simulationService.setSimulation(null);
    }

}