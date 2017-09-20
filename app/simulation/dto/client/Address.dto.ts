import { MailingAddress } from './MailingAddress.dto';
import { ResidenceType } from './ResidenceType.dto';
import { Province } from './../../../commons/province/dto/province.dto';
export class  Address{
    public id: string;
    public cep: string;
    public number: string;
    public address: string;
    public complement: string;
    public neighborhood: string;
    public city: string;
    public province:Province;
    public residenceType: ResidenceType
    public residesInAddressSince: Date;
    public mailingAddress: MailingAddress;

    constructor(){
        this.province = new Province();
        this.residenceType = new ResidenceType();
        this.mailingAddress = new MailingAddress();
    }
}