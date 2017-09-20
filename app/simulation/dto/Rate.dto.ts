import { Province } from './../../commons/province/dto/province.dto';
export class Rate {
    public id: string;
    public value:number;
    public province:Province;
    public taxType: string;
    constructor() {
    }
}