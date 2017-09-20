import { Color } from './Color.dto';
import { Province } from './../../../commons/province/dto/province.dto';
export class CarDetails{
    public chassiNumber: String;
    public registerNumber: String;
    public registrationProvince: Province;
    public licensingProvince: Province;
    public vehicleColor: Color;
    public renavam: String;
    public vehicleOrigin: String;

    constructor(){

    }
}