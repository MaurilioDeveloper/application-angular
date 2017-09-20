import { CertifiedAgent } from './client/CertifiedAgent.dto';
import { Reference } from './client/Reference.dto';
import { Guarantor } from './client/Guarantor.dto';
import { Address } from './client/Address.dto';
import { CarDetails } from './client/CarDetails.dto';
import { Bank } from './client/Bank.dto';
import { Company } from './client/Company.dto';
import { Profession } from './client/Profession.dto';
import { Occupation } from './client/Occupation.dto';
import { Spouse } from './client/Spouse.dto';
import { IssuingBody } from './client/IssuingBody.dto';
import { ResidenceType } from './client/ResidenceType.dto';
import { EconomicActivity } from './client/EconomicActivity.dto';
import { EconomicActivityGroup } from './client/EconomicActivityGroup.dto';
import { CompanySize } from './client/EmployerSize.dto';
import { LegalNature } from './client/LegaNature.dto';
import { Country } from './client/Country.dto';
import { DocumentType } from './client/DocumentType.dto';
import { EducationDegree } from './client/EducationDegree.dto';
import { PoliticalExposition } from './client/PoliticalExposition.dto';
import { CivilState } from './client/CivilState.dto';
import { Phone } from './client/Phone.dto';
import { BankDetails } from './client/BankDetails.dto';
import { Province } from './../../commons/province/dto/province.dto';

export class Client {
    public id: string;
    public cpfCnpj: string;
    public name: string;
    public email: string;
    public phoneType: string;
    public phone: Phone;
    public province: Province;
    public country: Country;
    public typePerson: TypePerson;

    /** Filds Customer Card **/
    /** Customer Data - PF **/
    public sex: string;
    public birthDate: Date;
    public civilState: CivilState;
    public cellphone: Phone;
    public naturalness: string;
    public politicalExposition: PoliticalExposition;
    public educationDegree: EducationDegree;
    public handicapped: boolean;
    public mothersName: string;
    public fathersName: string;
    public documentType: DocumentType;
    public numberDocument: string;
    public countryDocument: Country;
    public provinceDocument: Province;
    public dateIssue: Date;
    public issuingBody: IssuingBody;
    public dateValid: Date;

    /** Customer Data - PJ and PF**/
    public legalNature: LegalNature;
    public address: Address;
    /**Just PJ */
    public companySize: CompanySize;
    public ownSeat: boolean;
    public monthlyBilling: number;
    public economicActivityGroup: EconomicActivityGroup;
    public economicActivity: EconomicActivity;

    /**Agente Certificado */
    public certifiedAgent: CertifiedAgent;

    /**Cônjuge */
    public spouse: Spouse;

    /** Dados profissionais **/
    public company: Company;

    /** Referências **/
    reference1: Reference;
    reference2: Reference;

    /** Referências bancárias **/
    public bankDetails: BankDetails;
    /** Vehicle **/
    public carDetails: CarDetails;
    /** Guarantor 1 **/
    guarantor1: Guarantor;
    /** Guarantor 2 **/
    guarantor2: Guarantor;

    constructor() {
        this.phone = new Phone();
        this.address = new Address();
        this.guarantor1 = new Guarantor();
        this.guarantor2 = new Guarantor();
        this.bankDetails = new BankDetails();
        this.cpfCnpj = '';
    }

    
}

export enum TypePerson {
    PF = "PF",
    PJ = "PJ"
} 