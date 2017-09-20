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
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
// import {MoneyMaskProvider} from './money-mask.provider';
// import {InputManager} from './input.manager';
var forms_1 = require("@angular/forms");
var MoneyInputService = /** @class */ (function () {
    function MoneyInputService() {
        this.lastValidValue = '';
        // maskProvider: MoneyMaskProvider;
        // inputManager: InputManager;
        this.triggerChange = (function () {
            return;
        });
        this.options = {
            allowNegative: true,
            precision: 2,
            prefix: 'R$ ',
            suffix: '',
            thousands: '.',
            decimal: ',',
            allowZero: true,
            affixesStay: true
        };
        this.onchange = function (val) {
            console.log(val);
            return val;
        };
        /* get value() {
          return this.maskProvider.clear(this.rawValue);
        }
      
        set value(val) {
          this.rawValue = this.maskProvider.fromNumber(val);
        }
      
      
        get canInputMoreNumbers() {
          return this.inputManager.canInputMoreNumbers;
        }
      
        get inputSelection() {
          return this.inputManager.inputSelection;
        }
      
        get emptyValue() {
          return this.maskProvider.setSymbol(this.maskProvider.defaultMask);
        }
      
        constructor(input: any, options: any, onchange: any) {
          this.elementRef = input;
          this.options = Object.assign({}, this.options, options);
          this.onchange = onchange;
      
          this.maskProvider = new MoneyMaskProvider(this.options);
          this.inputManager = new InputManager(input, this.options);
        }
      
        init() {
          this.elementRef.style.textAlign = 'right';
          this.updateFieldValue(0);
        }
      
        onChange(handler: any) {
          this.triggerChange = handler || (() => {
              return;
            });
        }
      
        updateFieldValue(startPos: any) {
          let value = this.rawValue || '';
          const length = value.length;
          value = this.maskProvider.applyMask(value);
          this.inputManager.updateValueAndCursor(value, length, startPos);
        }
      
        changeSign() {
          this.rawValue = this.maskProvider.changeSign(this.rawValue);
        }
      
        removeSign() {
          this.rawValue = this.rawValue.replace('-', '');
        }
      
        processSpacebar(key: any) {
          const selection = this.inputSelection;
          let startPos = selection.start;
          let endPos = selection.end;
          const value = this.rawValue;
      
          // sem seleção
          if (startPos === endPos) {
            // espaço
            if (key === 8) {
              const lastNumber = value.split('').reverse().join('').search(/\d/);
              startPos = value.length - lastNumber - 1;
              endPos = startPos + 1;
            } else {
              endPos += 1;
            }
          }
      
          this.rawValue = value.substring(0, startPos) + value.substring(endPos, value.length);
          this.updateFieldValue(startPos);
        }
      
        reformatField() {
          const value = this.rawValue;
          const empty = this.emptyValue;
      
          if (value === '' || value === empty) {
            if (!this.options.allowZero) {
              this.rawValue = '';
            } else if (!this.options.affixesStay) {
              this.rawValue = this.maskProvider.defaultMask;
            } else {
              this.rawValue = empty;
            }
          } else {
            if (!this.options.affixesStay) {
              this.rawValue = this.rawValue.replace(this.options.prefix, '').replace(this.options.suffix, '');
            }
          }
      
          if (this.rawValue !== this.lastValidValue) {
            this.triggerChange();
          }
        }
      
        resetSelection() {
          const {elementRef} = this;
      
          if (elementRef.setSelectionRange) {
            length = this.rawValue.length;
            elementRef.setSelectionRange(length, length);
          } else {
            const value = this.rawValue;
            setTimeout(() => {
              this.rawValue = value;
            }, 1);
          }
        }
      
        saveFocusValue() {
          this.lastValidValue = this.rawValue;
      
          this.rawValue = this.maskProvider.apply(this.rawValue);
          const input = this.elementRef;
      
          if (input.createTextRange) {
            const textRange = input.createTextRange();
            textRange.collapse(false); // set the cursor at the end of the input
            textRange.select();
          }
        }
      
        waitAndFormat() {
          setTimeout(() => {
            this.maskProvider.apply(this.rawValue);
          }, 1);
        }
      
        addNumber(key: any) {
          const keyPressedChar = String.fromCharCode(key);
          const selection = this.inputSelection;
          const startPos = selection.start;
          const endPos = selection.end;
          const value = this.rawValue;
          this.rawValue = value.substring(0, startPos) + keyPressedChar + value.substring(endPos, value.length);
          this.updateFieldValue(startPos + 1);
        }
        */
    }
    MoneyInputService_1 = MoneyInputService;
    MoneyInputService.prototype.writeValue = function (value) {
    };
    MoneyInputService.prototype.registerOnChange = function (fn) {
        console.log(this.maskmoney);
        this.onChange = fn;
    };
    MoneyInputService.prototype.registerOnTouched = function (fn) {
        console.log(fn);
        this.onTouched = fn;
    };
    MoneyInputService.prototype.onKeyup = function ($event) {
        console.log($event.target.value);
    };
    Object.defineProperty(MoneyInputService.prototype, "rawValue", {
        get: function () {
            console.log(this.elementRef);
            return this.elementRef && this.elementRef.value;
        },
        set: function (value) {
            var _this = this;
            if (this.elementRef) {
                this.elementRef.value = value;
                if (this.onchange) {
                    setTimeout(function () { return _this.onchange(_this.rawValue); }, 1);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input('maskmoney'),
        __metadata("design:type", String)
    ], MoneyInputService.prototype, "maskmoney", void 0);
    __decorate([
        core_1.HostListener('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MoneyInputService.prototype, "onKeyup", null);
    MoneyInputService = MoneyInputService_1 = __decorate([
        core_2.Directive({
            selector: '[maskmoney]',
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: MoneyInputService_1,
                    multi: true
                }]
        })
    ], MoneyInputService);
    return MoneyInputService;
    var MoneyInputService_1;
}());
exports.MoneyInputService = MoneyInputService;
//# sourceMappingURL=money-input.service.js.map