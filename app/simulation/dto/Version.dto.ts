import { Acessorio } from './Acessorio.dto';
import { Option } from './Option.dto';
export class Version {
    public id: string;
    public description: string;
    public fipe: string;
    public yearManufacture:number;
    public yearModel:number;
    public price:number;
    public gender:String;
    public options:Array<Option>;
    public acessories:Array<Acessorio>;
    public url:String;
    constructor() {
    }
}