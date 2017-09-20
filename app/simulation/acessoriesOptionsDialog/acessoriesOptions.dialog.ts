import { AppMessage } from './../../app.message';
import { MdDialogRef } from '@angular/material';
import { Acessorio } from './../dto/Acessorio.dto';
import { Option } from './../dto/Option.dto';
import { AppService } from './../../app.service';
import { Version } from './../dto/Version.dto';
import { Simulation } from './../dto/Simulation.dto';
import { Component, Input, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'acessories-options-dialog',
    templateUrl: 'app/simulation/acessoriesOptionsDialog/acessoriesOptions.dialog.html'

})
export class AcessoriesOptionsDialog implements OnInit {
    simulation: Simulation;

    @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();
    acessorio: Acessorio = new Acessorio;
    enableButton: boolean;
    subtotalOpcionais: number = 0;
    subtotalAcessorios: number = 0;
    total: number = 0;
    optionList: Array<Option>;
    oldPriceVersion: number = 0;

    addAcessorio(acessorio: Acessorio) {
        let valor = acessorio.value.toString().replace("R$ ", "");
        valor = parseFloat(valor).toFixed(2);
        acessorio.value = parseFloat(valor.toString());
        this.simulation.car.version.acessories.push(acessorio);
        this.acessorio = new Acessorio;
        this.recalc();
    }

    delAcessorio(acessorio: Acessorio) {
        let index: number = this.simulation.car.version.acessories.indexOf(acessorio);
        if (index !== -1) {
            this.simulation.car.version.acessories.splice(index, 1);
        }
        this.recalc();
    }

    recalc(){
      
        this.total = this.simulation.car.version.price;
       
        this.subtotalOpcionais = 0;
        if (this.simulation.car.version.options) {
            this.simulation.car.version.options.forEach(option => {
                this.subtotalOpcionais =  this.subtotalOpcionais+ option.amount;
            });
        }

        this.subtotalAcessorios=0;
        if (this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories.forEach(acessorie => {
                this.subtotalAcessorios =  this.subtotalAcessorios+ acessorie.value;
            });
        }
        this.total= this.total+  this.subtotalOpcionais+ this.subtotalAcessorios;
    }

    ngOnInit(): void {
        this.oldPriceVersion= this.simulation.car.version.price;
        console.log(this.oldPriceVersion);
        if (!this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories = [];
        }
        let get = {};
        get['idVersion'] = this.simulation.car.version.id;
        get['listSelected'] = new Array<String>();
        if (this.simulation.car.version.options) {
            this.simulation.car.version.options.forEach(opt => {
                get['listSelected'].push(opt.id);
            });
        }
        let observable = this.appService.xSearchWithData('vehicleVersionOptions', get);
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.simulation.car.version.options = new Array<Option>();
                this.optionList = new Array<Option>();
                for (var index = 0; index < response.listOptions.length; index++) {
                    let opt = response.listOptions[index];
                    let option: Option = new Option;
                    option.id = opt["id"]
                    option.description = opt["description"]
                    option.amount = opt["amount"]
                    this.optionList.push(option);
                }

                if (response.selectedOptions != null) {
                    response.selectedOptions.forEach(opt => {
                        let option = this.optionList.filter(x => x.id === opt.id)[0];
                        this.simulation.car.version.options.push(option);
                        option.selected = true;
                    });
                }
                

                this.recalc();
            },
            err => {
                console.log(err.json());
            }
        );
    }

    checked(model) {
        return false;
    }
   

    updateTotal(value) {
        if(value.length > 0 && ( value < 0 || isNaN(parseFloat(value)))){
             value = this.oldPriceVersion;
            // this.appMessage.showWarning("Valor " +  value +this.oldPriceVersion);
        }
        if(value){
            value = value.toString().replace('R$ ',"").replace(',',".")
            this.simulation.car.version.price = parseFloat(value);
            this.recalc();
        }
    }

    updateCheckedOptions(model, evento) {
        if (evento.checked) {
            this.simulation.car.version.options.push(model);
        } else {
            let index: number = this.simulation.car.version.options.indexOf(model);
            if (index !== -1) {
                this.simulation.car.version.options.splice(index, 1);
            }
         }
         this.recalc();
    }

    constructor(private appService: AppService,public appMessage:AppMessage, public dialogRef: MdDialogRef<AcessoriesOptionsDialog>) {
    }
}