import { NgModel } from '@angular/forms';
import { Directive, Input } from '@angular/core';
@Directive({
  selector: '[omegamask]',
})
export class OmegaMaskDirective {
    @Input('omegamask') OmegaMask: string;
    constructor(public model: NgModel){

        this.model.control.valueChanges.subscribe(data => {
            if(!data){
                return;
            }

            var valor = data.replace(/\D/g, '');
            var pad = this.OmegaMask.replace(/\D/g, '').replace(/9/g, '_');
            var valorMask = valor + pad.substring(0, pad.length - valor.length);

            var valorMaskPos = 0;
            valor = '';
            for (var i = 0; i < this.OmegaMask.length; i++) {
                if (isNaN(parseInt(this.OmegaMask.charAt(i)))) {
                    valor += this.OmegaMask.charAt(i);
                } else {
                    valor += valorMask[valorMaskPos++];
                }
            }

            if (valor.indexOf('_') > -1) {
                valor = valor.substr(0, valor.indexOf('_'));
            }
            
            data = valorMask.substring(0, pad.length);
            this.model.valueAccessor.writeValue(valor);
            this.model.viewToModelUpdate(data);
            this.model.model = data;
  
        })


    }
}