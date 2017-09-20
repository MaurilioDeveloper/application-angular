import { Bank } from './Bank.dto';
import { Phone } from './Phone.dto';
export class BankDetails {
    public id : string;
    public branch: string;
    public branchDigit: string;
    public account: string;
    public accountDigit: string;
    public customerSince: Date;
    public accountType: string;
    public phoneBranch: Phone;  
    public bank: Bank;
    constructor() {
        this.phoneBranch = new Phone();
    }
}