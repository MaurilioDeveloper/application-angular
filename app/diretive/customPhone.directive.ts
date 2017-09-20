import { AppMessage } from './../app.message';
import { NgModel, AbstractControl } from '@angular/forms';
import { Directive, Input, HostBinding, forwardRef, Attribute, ElementRef, Renderer } from '@angular/core';
@Directive({
    selector: '[customphone]',
    host: { '(blur)': 'onBlur($event)' }
})
export class CustomPhoneDiretive {
    @Input('valid') valid;

    onBlur($event) {
        if (!this.valid) {
            this.appMessage.showError("Campo Telefone inválido");
        }
        let parent = $event.srcElement.closest('md-input-container');
        parent.className = parent.className.replace(" fieldInvalid", "");
        if (!this.valid) {
            parent.className += " fieldInvalid"
        }
    }

    constructor(public model: NgModel, private appMessage: AppMessage) {
        this.model.control.valueChanges.subscribe(data => {
            if (!data) {
                return;
            }
            let valor = data.replace(/\D/g, '');

            if (valor.length == 11) {
                data = data.replace(/\D/g, '')
                data = data.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                this.valid = true;
            }else if(valor.length == 10){
                data = data.replace(/\D/g, '')
                data = data.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                this.valid = true;
            }else{
                data = data.replace(/\D/g, '');
                this.valid = false;
            }
            this.model.valueAccessor.writeValue(data);
            this.model.viewToModelUpdate(valor);
            this.model.model = valor;

        })
    }


}