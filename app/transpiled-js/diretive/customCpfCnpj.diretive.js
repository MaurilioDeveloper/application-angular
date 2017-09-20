"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_message_1 = require("./../app.message");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var CustomCpfCnpjDiretive = /** @class */ (function () {
    function CustomCpfCnpjDiretive(model, appMessage) {
        var _this = this;
        this.model = model;
        this.appMessage = appMessage;
        this.model.control.valueChanges.subscribe(function (data) {
            if (!data) {
                return;
            }
            var valor = data.replace(/\D/g, '');
            var valorMask = "";
            if (valor.length > 14) {
                valor = valor.substr(0, 14);
            }
            if (valor.length <= 11) {
                // valorMask = data.replace(/\D/g, '')
                // valorMask = data.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                if (valor.length <= 3) {
                    valorMask = valor;
                }
                else if (valor.length <= 6) {
                    valorMask = valor.substr(0, 3) + '.' + valor.substr(3, valor.length - 3);
                }
                else if (valor.length <= 9) {
                    valorMask = valor.substr(0, 3) + '.';
                    valorMask += valor.substr(3, 3) + '.';
                    valorMask += valor.substr(6, valor.length - 6);
                }
                else if (valor.length <= 11) {
                    valorMask = valor.substr(0, 3) + '.';
                    valorMask += valor.substr(3, 3) + '.';
                    valorMask += valor.substr(6, 3) + '-';
                    valorMask += valor.substr(9, valor.length - 9);
                }
            }
            else if (valor.length > 11) {
                // valorMask = data.replace(/\D/g, '')
                // valorMask = data.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
                if (valor.length === 12) {
                    valorMask = valor.substr(0, 2) + '.';
                    valorMask += valor.substr(2, 3) + '.';
                    valorMask += valor.substr(5, 3) + '/';
                    valorMask += valor.substr(8, 4);
                }
                else if (valor.length < 14) {
                    valorMask = valor.substr(0, 2) + '.';
                    valorMask += valor.substr(2, 3) + '.';
                    valorMask += valor.substr(5, 3) + '/';
                    valorMask += valor.substr(8, 4) + '-';
                    valorMask += valor.substr(12, valor.length - 12) + '';
                }
                else {
                    valorMask = valor.substr(0, 2) + '.';
                    valorMask += valor.substr(2, 3) + '.';
                    valorMask += valor.substr(5, 3) + '/';
                    valorMask += valor.substr(8, 4) + '-';
                    valorMask += valor.substr(12, 2) + '';
                }
            }
            _this.valida(valor);
            _this.model.valueAccessor.writeValue(valorMask);
            _this.model.viewToModelUpdate(valor);
            _this.model.model = valor;
        });
    }
    CustomCpfCnpjDiretive.prototype.onBlur = function ($event) {
        if (!this.valid) {
            this.appMessage.showError("Campo CPF/CNPJ inválido");
        }
        this.valid = this.valid;
        var parent = $event.srcElement.closest('md-input-container');
        parent.className = parent.className.replace(" fieldInvalid", "");
        if (!this.valid) {
            parent.className += " fieldInvalid";
        }
    };
    CustomCpfCnpjDiretive.prototype.valida = function (valor) {
        this.valid = false;
        if (valor.length <= 11) {
            if (valor.length === 11) {
                this.valid = this.valida_cpf(valor);
            }
        }
        else {
            if (valor.length === 14) {
                this.valid = this.valida_cnpj(valor);
            }
        }
    };
    CustomCpfCnpjDiretive.prototype.calc_digitos_posicoes = function (digitos, posicoes, soma_digitos) {
        if (posicoes === void 0) { posicoes = 10; }
        if (soma_digitos === void 0) { soma_digitos = 0; }
        digitos = digitos.toString();
        // Faz a soma dos dígitos com a posição
        // Ex. para 10 posições:
        //   0    2    5    4    6    2    8    8   4
        // x10   x9   x8   x7   x6   x5   x4   x3  x2
        //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
        for (var i = 0; i < digitos.length; i++) {
            // Preenche a soma com o dígito vezes a posição
            soma_digitos = soma_digitos + (digitos[i] * posicoes);
            // Subtrai 1 da posição
            posicoes--;
            // Parte específica para CNPJ
            // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
            if (posicoes < 2) {
                // Retorno a posição para 9
                posicoes = 9;
            }
        }
        // Captura o resto da divisão entre soma_digitos dividido por 11
        // Ex.: 196 % 11 = 9
        soma_digitos = soma_digitos % 11;
        // Verifica se soma_digitos é menor que 2
        if (soma_digitos < 2) {
            // soma_digitos agora será zero
            soma_digitos = 0;
        }
        else {
            // Se for maior que 2, o resultado é 11 menos soma_digitos
            // Ex.: 11 - 9 = 2
            // Nosso dígito procurado é 2
            soma_digitos = 11 - soma_digitos;
        }
        // Concatena mais um dígito aos primeiro nove dígitos
        // Ex.: 025462884 + 2 = 0254628842
        var cpf = digitos + soma_digitos;
        // Retorna
        return cpf;
    };
    CustomCpfCnpjDiretive.prototype.valida_cpf = function (valor) {
        // Garante que o valor é uma string
        valor = valor.toString();
        // Remove caracteres inválidos do valor
        valor = valor.replace(/[^0-9]/g, '');
        // Captura os 9 primeiros dígitos do CPF
        // Ex.: 02546288423 = 025462884
        var digitos = valor.substr(0, 9);
        // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
        var novo_cpf = this.calc_digitos_posicoes(digitos);
        // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
        var novo_cpf = this.calc_digitos_posicoes(novo_cpf, 11);
        // Verifica se o novo CPF gerado é idêntico ao CPF enviado
        if (novo_cpf === valor) {
            if (novo_cpf == "00000000000") {
                // CPF inválido
                return false;
            }
            // CPF válido
            return true;
        }
        else {
            // CPF inválido
            return false;
        }
    };
    CustomCpfCnpjDiretive.prototype.valida_cnpj = function (valor) {
        // Garante que o valor é uma string
        valor = valor.toString();
        // Remove caracteres inválidos do valor
        valor = valor.replace(/[^0-9]/g, '');
        // O valor original
        var cnpj_original = valor;
        // Captura os primeiros 12 números do CNPJ
        var primeiros_numeros_cnpj = valor.substr(0, 12);
        // Faz o primeiro cálculo
        var primeiro_calculo = this.calc_digitos_posicoes(primeiros_numeros_cnpj, 5);
        // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
        var segundo_calculo = this.calc_digitos_posicoes(primeiro_calculo, 6);
        // Concatena o segundo dígito ao CNPJ
        var cnpj = segundo_calculo;
        // Verifica se o CNPJ gerado é idêntico ao enviado
        if (cnpj === cnpj_original) {
            if (cnpj == "00000000000000") {
                // CPF inválido
                return false;
            }
            return true;
        }
        // Retorna falso por padrão
        return false;
    };
    __decorate([
        core_1.Input('valid'),
        __metadata("design:type", Object)
    ], CustomCpfCnpjDiretive.prototype, "valid", void 0);
    CustomCpfCnpjDiretive = __decorate([
        core_1.Directive({
            selector: '[customcpfcnpj]',
            host: { '(blur)': 'onBlur($event)' }
        }),
        __metadata("design:paramtypes", [forms_1.NgModel, app_message_1.AppMessage])
    ], CustomCpfCnpjDiretive);
    return CustomCpfCnpjDiretive;
}());
exports.CustomCpfCnpjDiretive = CustomCpfCnpjDiretive;
//# sourceMappingURL=customCpfCnpj.diretive.js.map