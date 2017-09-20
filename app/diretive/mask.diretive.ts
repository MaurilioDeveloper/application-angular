// import { Directive, HostListener, Input } from '@angular/core';
// import {
//   NG_VALUE_ACCESSOR, ControlValueAccessor
// } from '@angular/forms';
// import {FormBuilder } from '@angular/forms';

// @Directive({
//   selector: '[omegamask]',
//   providers: [ {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: OmegaMaskDirective1,
//     multi: true
//   }]
// })
// export class OmegaMaskDirective1 implements ControlValueAccessor {
//   constructor() {
//   }


//   onTouched: any;
//   onChange: any;

//   @Input('omegamask') OmegaMask: string;

//   writeValue(value: any): void {
//   }

//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }

//   @HostListener('keyup', ['$event'])
//   onKeyup($event: any) {
//     var valor = $event.target.value.replace(/\D/g, '');
//     var pad = this.OmegaMask.replace(/\D/g, '').replace(/9/g, '_');
//     var valorMask = valor + pad.substring(0, pad.length - valor.length);

//     // retorna caso pressionado backspace
//     if ($event.keyCode === 8) {
//       this.onChange(valor);
//       return;
//     }

//     if (valor.length <= pad.length) {
//       this.onChange(valor);
//     }

//     var valorMaskPos = 0;
//     valor = '';
//     for (var i = 0; i < this.OmegaMask.length; i++) {
//       if (isNaN(parseInt(this.OmegaMask.charAt(i)))) {
//         valor += this.OmegaMask.charAt(i);
//       } else {
//         valor += valorMask[valorMaskPos++];
//       }
//     }

//     if (valor.indexOf('_') > -1) {
//       valor = valor.substr(0, valor.indexOf('_'));
//     }
//     $event.target.value = valor;

//   }

//   @HostListener('blur', ['$event'])
//   onBlur($event: any) {
//     this.model.viewToModelUpdate($event.target.value);
//     this.model.valueAccessor.writeValue($event.target.value);
//     if ($event.target.value.length === this.OmegaMask.length) {
//       return;
//     }
//     this.onChange('');
//     $event.target.value = '';
//   }
// }