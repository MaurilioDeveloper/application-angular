import { Service } from './../../../../dto/Service.dto';
import { Option } from './../../../../dto/Option.dto';
import { CalculationComponent } from './../calculation.component';
import { MdDialogRef } from '@angular/material';
import { AppService } from './../../../../../app.service';
import { Simulation } from './../../../../dto/Simulation.dto';

import { Component, Input, OnInit, NgModule, EventEmitter, Output } from '@angular/core';
import { ServiceResponseDTO } from "./ServiceResponseDTO";
import { AppMessage } from "../../../../../app.message";

@Component({
    selector: 'services-dialog',
    templateUrl: 'app/simulation/calculationPainel/calculationDialog/calculation/servicesDialog/servicesDialog.dialog.html',
   styleUrls: ['app/simulation/calculationPainel/calculationDialog/calculation/servicesDialog/servicesDialog.dialog.scss'],
})

export class ServicesDialog implements OnInit {
    simulation: Simulation;
    calculationID: string;
    serviceList:  Array<ServiceResponseDTO> = new Array<ServiceResponseDTO>();
    itsSaleMan: boolean;

    ngOnInit(): void {
        let observable = this.appService.xSearch('userProfile', 'verifyuseradmin');
        let dialogRef;
        observable.subscribe(
            (data) => {
                let response = data.json();
                if (response.userAdmin) {                    
                    this.itsSaleMan = false;
                } else {
                    this.itsSaleMan = true;
                }
            });

        let query = {};
        query["structureId"] = this.simulation.salesmanStructure.structureId;
        query["productId"] = this.simulation.calculations[this.calculationID].financialType.financeTypeId;
        query["vehicleType"] = this.simulation.car.vehicleType
       
         let services = this.appService.xSearchWithData("serviceService/questService", query)
        
        services.subscribe(
            (data) => {
                let serviceResponse = data.json();
                //console.log(serviceResponse);
                this.serviceList.length = 0;
                serviceResponse.listService.forEach(response => {
                    response.checked = false;
                    this.serviceList.push(response);
                })

                this.serviceList = serviceResponse.listService;
                if (this.simulation.calculations[this.calculationID].services) {
                    this.simulation.calculations[this.calculationID].services.forEach(exist => {
                        this.serviceList.forEach(response => {
                            if (response.id === exist.id) {
                                response.checked = true;
                            }
                        });
                    });
                } else {
                    this.serviceList.forEach(response => {
                        if (response.required) {
                            response.checked = true;
                        }
                        if(response.selecetedDefault){
                             response.checked = true;
                        }
                    });
                }
            });
         
    }
    onfocus(service: ServiceResponseDTO) {
        service.checked = true;  
    }
  
    validate(event, service: ServiceResponseDTO) {
       // this.appMessage.showWarning("event " + event);
       // console.log("event ", event, event.target.value);
        if (service.maxAmount) {
            if (event.target.value > service.maxAmount) {
                event.target.value = service.maxAmount;
                service.amount = service.maxAmount;
               // this.appMessage.showWarning("Max " + service.maxAmount);

            }
        }

        if (service.minAmount) {
            if (event.target.value < service.minAmount) {
                event.target.value = service.minAmount;
                service.amount = service.minAmount;
               // this.appMessage.showWarning("Min " + service.minAmount);
            }
        }
        if (!event || event === undefined ){
            service.amount = 0;
        }
    }

    constructor(private appService: AppService, public appMessage: AppMessage, public dialogRef: MdDialogRef<ServicesDialog>) {
    }
}