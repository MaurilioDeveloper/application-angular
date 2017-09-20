import { Address } from './Address.dto';
import { ProofIncomeType } from './ProofIncomeTypeDTO.dto';
import { IncomeType } from './IncomeType.dto';
import { CompanySize } from './EmployerSize.dto';
import { EconomicActivity } from './EconomicActivity.dto';
import { EconomicActivityGroup } from './EconomicActivityGroup.dto';
import { Phone } from './Phone.dto';
import { Province } from './../../../commons/province/dto/province.dto';
import { Profession } from './Profession.dto';
import { Occupation } from './Occupation.dto';
export class Company {
    public id: String;
    public name: String;
    public occupation: Occupation;
    public profession: Profession;
    public cnpj: String;
    public address: Address;
    public comercialPhone: Phone;
    public economicActivityGroup: EconomicActivityGroup;
    public economicActivity: EconomicActivity;
    public size: CompanySize;
    public admissionDate: Date;
    public patrimony: number;
    public incomeType: IncomeType;
    public proofIncomeType: ProofIncomeType;
    public monthlyIncome: number;
    public otherIncomes: number;
    public ownSeat: boolean;

    constructor(){
        this.address = new Address();
        this.comercialPhone = new Phone();
    }
}