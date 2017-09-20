import { OnInit } from '@angular/core';
import { Directive, HostListener, Input, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  selector: "[phone]",
})
export class PhoneMaskDirective implements OnInit {

  onTouched: any;
  onChange: any;
  @Output() ngModelChange = new EventEmitter();

  public constructor(private elementRef: ElementRef) {
    this.onChange = this.elementRef.nativeElement;
  }

  
  ngOnInit() {
  }

 
  writeValue(value: any): void {
      console.log(value);
  }
 
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
 
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
 
  @HostListener('keyup', ['$event.target.value']) 
  onKeyup($event: any) {
    console.log($event);
  }
 
    @HostListener("blur", ["$event.target.value"])
  onBlur($event: any) {
    console.log($event);
  }

}