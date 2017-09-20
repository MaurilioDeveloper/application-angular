import { Acessorio } from './Acessorio.dto';
import { Version } from './Version.dto';
export class Car {
    public id: string;
    public description: string;
    public url: string;
    public selected:boolean;
    public gender:string;
    public vehicleType:string;
    public version:Version;
    public totalprice:number;
   
    constructor(id,description,vehicleType,url) {
        this.id=id;
        this.description=description;
        this.vehicleType=vehicleType;
        this.url=url;
        this.version = new Version();
    }
}