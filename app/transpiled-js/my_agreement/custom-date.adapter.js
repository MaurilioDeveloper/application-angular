"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@angular/material");
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
var CustomDateAdapter = /** @class */ (function (_super) {
    __extends(CustomDateAdapter, _super);
    function CustomDateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomDateAdapter.prototype.parse = function (value) {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            var str = value.split('/');
            var year = Number(str[2]);
            var month = Number(str[1]) - 1;
            var date = Number(str[0]);
            return new Date(year, month, date);
        }
        var timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    };
    // retirar quando for feito o merge da data por mmalerba
    CustomDateAdapter.prototype.format = function (date, displayFormat) {
        date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        displayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });
        var dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
        return dtf.format(date).replace(/[\u200e\u200f]/g, '');
    };
    return CustomDateAdapter;
}(material_1.NativeDateAdapter));
exports.CustomDateAdapter = CustomDateAdapter;
//# sourceMappingURL=custom-date.adapter.js.map