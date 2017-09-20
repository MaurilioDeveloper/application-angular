import { Province } from './../../../commons/province/dto/province.dto';
import { Company } from './Company.dto';
import { Phone } from './Phone.dto';
import { Profession } from './Profession.dto';
import { Occupation } from './Occupation.dto';
import { IssuingBody } from './IssuingBody.dto';
export class Spouse{
    public id: String;
    public name:String;
    public cpf:String;
    public sex:String;
    public birthDate:Date;
    public province:Province;
    public numberDocument:String;
    public issuingBody:IssuingBody;
    public company: Company;

    constructor(){
        this.province = new Province();
        this.issuingBody = new IssuingBody();
        this.company = new Company();
    }
}