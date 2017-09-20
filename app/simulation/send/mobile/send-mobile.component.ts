import { Calculation } from './../../dto/Calculation.dto';
import { Simulation } from './../../dto/Simulation.dto';
import { SendService } from './../service/send.service';
import { EventEmitter, Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'send-mobile',
    templateUrl: './app/simulation/send/mobile/send-mobile.component.html',
    providers: [SendService]
})
export class SendMobileComponent implements OnInit {

    private numberProposal: number;
    private proposalStauts: string;

    @Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private sendService: SendService) {
    }

    ngOnInit() {
       this.sendService.init();
    }


    getList(): Object[] {
        return this.sendService.list;
    }

    getSelected(list: [Calculation]) {
        if(list){
            list.forEach(calculation => {
                if (calculation.selected) {
                    return [calculation];
                }
            });
        }
    }

    backAndNext(toFront: boolean) {
        this.changeStep.emit(toFront);
    }

    getSimulation(){
        return this.sendService.simulation;
    }


}