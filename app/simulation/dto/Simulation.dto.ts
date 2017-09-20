import { FinancialTable } from './FinancialTable.dto';
import { FinancialType } from './FinancialType.dto';
import { Province } from './../../commons/province/dto/province.dto';
import { Version } from './Version.dto';
import { Phone } from './client/Phone.dto';
import { SalesmanStructure } from './SalesmanStructure.dto.';
import { SpecialType } from './SpecialType.dto';
import { Calculation } from './Calculation.dto';
import { Brand } from './Brand.dto';
import { SaleType } from './SaleType.dto';
import { Client } from './Client.dto';
import { Car } from './Car.dto';
import { Address } from './client/Address.dto';


export class Simulation{
    public id: string;
    public dossierNumber: string;
    public statsDescription:string;
    public car:Car;
    public client:Client;
    public saleType:SaleType;
    public tc:boolean; 
    public vizualization:Boolean;
    public brand:Brand;
    public calculations:[Calculation];
    public calculationSelected:Calculation;
    public specialTypes: Array<SpecialType>;
    public isShowRoomSemiNews: boolean;
    public showNewOnes: boolean;
    public certifiedAgent:string;
    public step1CanNext:boolean =false;
    public step2CanNext:boolean =false;
    public step3CanNext:boolean =false;
    public step4CanNext:boolean =true;
    public step5CanNext:boolean =false;
    public step6CanNext:boolean =false;
    public step7CanNext:boolean =false;
    public showResumMobile: boolean = false;
    public reviewContractSimulation: boolean = false;
    public detailSimulation: boolean = false;
    public salesmanStructure: SalesmanStructure;
    public showBtnSave: boolean = false;
    public step: number;

    constructor() {
        this.client = new Client;
        this.calculationSelected = new Calculation();
        this.saleType = new SaleType();
        this.car = new Car('','','','');
        this.tc = false;
        this.vizualization = false;
        this.step = 0;
    }
}