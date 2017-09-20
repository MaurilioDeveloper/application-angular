import {Pipe, PipeTransform} from "@angular/core";
 
@Pipe({name: 'phoneMask'})
export class PhonePipe implements PipeTransform{
 
    transform(value:string){
       if(value){
            value = value.toString();
            if(value.length == 10){
                return value.substring(0,0).concat("(")
                                     .concat(value.substring(3,1))
                                     .concat(")")
                                     .concat(value.substring(6,1))
                                     .concat("-").concat(value.substr(7,4))
            }else{
                return value.substring(0,0).concat("(")
                                     .concat(value.substring(3,1))
                                     .concat(")")
                                     .concat(value.substring(5,1))
                                     .concat("-").concat(value.substr(6,4))
            } 
        }
        return value;
    }
}