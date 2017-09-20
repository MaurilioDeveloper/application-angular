import { Salesman } from './../../selected_salesman_dialog/dto/salesman.dto';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SelectedSalesmanDialog } from './../../selected_salesman_dialog/selectedSalesman.dialog';
import { AppComponent } from './../../../app.component';
import { AuthService } from './../../../login/auth.service';
import { SalesmanStructure } from './../../dto/SalesmanStructure.dto.';
import { Province } from './../../../commons/province/dto/province.dto';
import { SaleType } from './../../dto/SaleType.dto';
import { AppService } from './../../../app.service';
import { Simulation } from './../../dto/Simulation.dto';
import { SimulationService } from './../../simulation.service';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../step.enum';


@Injectable()
export class FormClientService {

    simulation: Simulation;

    listSaleType: SaleType[];
    listProvinces: Array<Province>;

    private SHOW_ROOM = 6;

    public BRAND_CODE_NISSAN: string = '000000000003';
    public BRAND_CODE_RENAULT: string = '000000000002';
    public BRAND_CODE_RCI: string = '000000000006';

    public BRAND_NISSAN: string = 'nissan';
    public BRAND_RENAULT: string = 'renault';
    public BRAND_RCI: string = 'rci';

    private isUserAdmin: boolean = false;
    private forceClose = false;

    dialogRef: MdDialogRef<SelectedSalesmanDialog>;	


    constructor(private dialog: MdDialog, private appService: AppService, private authService: AuthService, private appComponent: AppComponent, private router: Router, private simulationService: SimulationService) {
        this.router = router;
    }

    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if (this.simulation && this.simulation.step == StepEnum.STEP_CLIENT) {
                this.onload();
            }
        });
    }

    private onload() {
        this.loadSalesType();
        this.loadProvinces();
        if (!sessionStorage.getItem('salesman') && !this.simulation.vizualization) {
            this.verifyUser();
        }
    }


    loadSalesType() {
        let observable = this.appService.xSearch('simulation/salestype', this.simulation.saleType.id);
        observable.subscribe(
            (data) => {
                let response = data.json();
                response.listVehicleType.forEach(element => {
                    if (!this.simulation.saleType.id) {
                        if (element.value == this.SHOW_ROOM) {
                            this.simulation.saleType = element;
                        }
                    } else {
                        if (this.simulation.saleType.id === element.id) {
                            this.simulation.saleType = element;
                        }
                    }
                });
                this.listSaleType = response.listVehicleType;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadProvinces() {
        let states;
        let requestProvince = new Object;
        if (this.simulation.id) {
            requestProvince['selected'] = this.simulation.client.address.province;
        }
        states = this.appService.xSearchWithData("provinces/provincesclient", requestProvince);
        states.subscribe(
            (data) => {
                let stateSelected: Province;
                let response = data.json();
                this.listProvinces = new Array<Province>();
                for (var i = 0; i < response.provinceList.length; i++) {
                    let provincefor = response.provinceList[i];
                    // let province = new Province(provincefor['id'], provincefor['description']);
                    let province = new Province();
                    province.id = provincefor['id'];
                    province.description = provincefor['description'];
                    if (response.provinceSelected) {
                        if (response.provinceSelected.id === provincefor['id']) {
                            this.simulation.client.address.province = province;
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

    loadStructureSalesman() {
        let observable = this.appService.xSearchWithData('structureService/questDealershipBySallesmanUser', {});
        observable.subscribe(
            (data) => {
                let response = data.json();
                let structure = response.structure;

                if (!this.simulation.salesmanStructure) {
                    this.simulation.salesmanStructure = new SalesmanStructure;
                }
                if (structure != null) {
                    this.authService.setStructure(response.structure.structureId);

                    this.simulation.salesmanStructure.structureId = structure.structureId != null ? structure.structureId : '';
                    this.simulation.salesmanStructure.structureDescription = structure.description;

                    let item = {};
                    let theme = "";

                    let oldtheme = this.appComponent.theme;
                    this.authService.setOldTheme(oldtheme);

                    if (structure.financeBrandImportCode == this.BRAND_CODE_NISSAN) {
                        theme = this.BRAND_NISSAN;
                    } else if (structure.financeBrandImportCode == this.BRAND_CODE_RENAULT) {
                        theme = this.BRAND_RENAULT;
                    } else if (structure.financeBrandImportCode == this.BRAND_CODE_RCI) {
                        theme = this.BRAND_RCI;
                    }

                    item["value"] = theme;
                    this.appComponent.changeTheme(item);

                }
            },
            err => {
                console.log(err.json());
            }
        );
    }



    private verifyUser() {
        let observable = this.appService.xSearch('userProfile', 'verifyuseradmin');

        observable.subscribe(
            (data) => {
                let response = data.json();
                this.isUserAdmin = response.userAdmin;
                if (this.isUserAdmin && !this.simulation.id) {
                    if (!this.dialogRef) {
                        this.dialogRef = this.dialog.open(SelectedSalesmanDialog);
                        this.dialogRef.afterClosed().subscribe(() => {
                            if (!this.forceClose) {
                                if (!sessionStorage.getItem('salesman')) {
                                    this.router.navigateByUrl('/home');
                                } else {
                                    let salesman = JSON.parse(sessionStorage.getItem('salesman'));
                                    this.simulation.salesmanStructure = new SalesmanStructure;
                                    this.simulation.salesmanStructure.salesmanId = salesman.id;
                                    this.simulation.salesmanStructure.salesmanName = salesman.name;
                                    this.loadProvinces();
                                    this.loadStructureSalesman();
                                }
                            }
                        });
                    }
                } else {
                    if (this.isUserAdmin && this.simulation.id) {
                        this.loadSallamen();
                    }
                    this.loadStructureSalesman();
                }

            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadSallamen() {
		let observable = this.appService.xSearch('simulation/salesman', this.simulation.id);
		observable.subscribe(
			(data) => {
				let response = data.json();
				this.authService.setSalesMan(new Salesman(response.salesman.id, response.salesman.name));
				let salesman = JSON.parse(sessionStorage.getItem('salesman'));
				this.simulation.salesmanStructure = new SalesmanStructure;
				this.simulation.salesmanStructure.salesmanId = salesman.id;
				this.simulation.salesmanStructure.salesmanName = salesman.name;
			});

	}


}