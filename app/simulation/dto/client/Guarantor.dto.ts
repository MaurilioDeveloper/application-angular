import { BankDetails } from './BankDetails.dto';
import { BusinessRelashionshipType } from './BusinessRelashionshipType.dto';
import { Bank } from './Bank.dto';
import { Reference } from './Reference.dto';
import { Company } from './Company.dto';
import { Spouse } from './Spouse.dto';
import { ResidenceType } from './ResidenceType.dto';
import { LegalNature } from './LegaNature.dto';
import { IssuingBody } from './IssuingBody.dto';
import { DocumentType } from './DocumentType.dto';
import { EducationDegree } from './EducationDegree.dto';
import { PoliticalExposition } from './PoliticalExposition.dto';
import { Province } from './../../../commons/province/dto/province.dto';
import { Country } from './Country.dto';
import { Phone } from './Phone.dto';
import { CivilState } from './CivilState.dto';
import { KinshipType } from './KinshipType.dto';
import { GuarantorType } from './GuarantorType.dto';
import { Address } from './Address.dto';

export class Guarantor{
    public id: String;
    public guarantorType: GuarantorType;
    public kinshipType: KinshipType;
    public businessRelashionshipType: BusinessRelashionshipType;
    public name: String;
    public cpf: String;
    public sex: String;
    public birthDate: Date;
    public civilState: CivilState;
    public fixPhoneType: string;
    public fixPhone: Phone;
    public cellphone: Phone;
    public email: String;
    public country: Country;
    public province: Province;
    public naturalness: String;
    public politicalExposition: PoliticalExposition;
    public educationDegree: EducationDegree;
    public handicapped: boolean;
    public mothersName: String;
    public fathersName: String;
    public documentType: DocumentType;
    public numberDocument: String;
    public countryDocument: Country;
    public provinceDocument: Province;
    public dateIssueDocument: Date;
    public issuingBodyDocument:IssuingBody;
    public validDateDocument: Date;

    /**Dados Residenciais */
    public address: Address;

    /**Cônjuge */
    public spouse: Spouse;
    /**Dados Profissionais */
    public company: Company;

    /** Referências **/
    public reference1:Reference;
    public reference2:Reference;

    /**Referências Bancárias */
    public bankDetails: BankDetails;

    public isRequired: boolean;
    public copySpouseEnabled:boolean;

    constructor(){
        this.kinshipType = new KinshipType();
        this.businessRelashionshipType =  new BusinessRelashionshipType();
        this.civilState = new CivilState();
        this.fixPhone = new Phone();
        this.cellphone = new Phone();
        this.country = new Country();
        this.province = new Province();
        this.politicalExposition = new PoliticalExposition();
        this.educationDegree = new EducationDegree();
        this.documentType = new DocumentType();
        this.countryDocument = new Country();
        this.provinceDocument = new Province();
        this.issuingBodyDocument = new IssuingBody();
        this.address = new Address();
        this.company = new Company();
        this.reference1 = new Reference();
        this.reference2 = new Reference();
        this.spouse = new Spouse();
    }
}