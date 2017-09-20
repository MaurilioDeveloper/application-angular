import { AppService } from './../../app.service';
import { Province } from './dto/province.dto';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
    selector: 'province',
    templateUrl: 'app/commons/province/province.component.html'
})

export class ProvinceComponent implements OnInit, OnChanges {
    listProvinces: Array<Province>;
    @Input() provinceSelected: Province;
    @Output() changeProvince: EventEmitter<Province> = new EventEmitter<Province>();

    constructor(private appService: AppService) {

    }

    ngOnInit() {
        this.loadProvinces();
    }

    ngOnChanges() {
        if (!this.provinceSelected) {
            this.loadProvinces();
            this.changeProvince.emit(this.provinceSelected);
        }
    }
    changes(province: Province) {
        this.provinceSelected = province;
        this.changeProvince.emit(this.provinceSelected);
    }

    loadProvinces() {
        let states;
        if (this.provinceSelected) {
            let data = { idProvinceSelected: this.provinceSelected.id };
            states = this.appService.xSearchWithData("provinces/provinces", data);
        } else {
            states = this.appService.xSearchWithData("provinces/provinces", { idProvinceSelected: null });
        }
        states.subscribe(
            (data) => {
                let stateSelected: Province;
                let response = data.json();
                this.listProvinces = new Array<Province>();
                for (var i = 0; i < response.provinceList.length; i++) {
                    let provincefor = response.provinceList[i];
                    let province = new Province();
                    province.id=provincefor['id'];
                    province.description=provincefor['description'];
                    if (response.provinceSelected) {
                        if (response.provinceSelected.id === provincefor['id']) {
                            this.provinceSelected = province;
                        }
                    }
                    this.listProvinces.push(province);
                }
            },
            err => {
                console.log(err.json());
            }
        );
    }

}