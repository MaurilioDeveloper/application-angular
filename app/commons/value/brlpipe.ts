import { Pipe, PipeTransform } from "@angular/core";

const PADDING = "000000";

@Pipe({ name: "money" })
export class BrlPipe implements PipeTransform {

  private PREFIX: string
  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  private SUFFIX: string
  
  constructor() {
    // TODO comes from configuration settings
    this.PREFIX = 'R$ '
    this.DECIMAL_SEPARATOR = ",";
    this.THOUSANDS_SEPARATOR = ".";
    this.SUFFIX = ''
  }

  transform(value: string, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").toString()
      .split(".");

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    if(integer.indexOf("R$") + 1) {
      integer = integer.replace('R$ ', '');
      if(integer.indexOf(fraction) + 1){
        integer = integer.replace(fraction, '');
      }
    }else {
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
    }
    // return this.PREFIX + integer + fraction;
    if(integer.trim().length === 0 ){
      integer = "0";
    }
    return this.PREFIX + integer + fraction;
  }

  parse(value: string, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").replace(this.PREFIX, "")
                                                  .replace(this.SUFFIX, "")
                                                  .split(this.DECIMAL_SEPARATOR);

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    return integer + fraction;
  }

}