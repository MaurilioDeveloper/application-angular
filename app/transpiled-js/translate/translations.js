"use strict";
// app/translate/translation.ts
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import translations
var lang_en_1 = require("./lang-en");
var lang_es_1 = require("./lang-es");
var lang_fr_1 = require("./lang-fr");
var lang_pt_1 = require("./lang-pt");
// translation token
exports.TRANSLATIONS = new core_1.OpaqueToken('translations');
// all traslations
var dictionary = (_a = {},
    _a[lang_en_1.LANG_EN_NAME] = lang_en_1.LANG_EN_TRANS,
    _a[lang_es_1.LANG_ES_NAME] = lang_es_1.LANG_ES_TRANS,
    _a[lang_fr_1.LANG_FR_NAME] = lang_fr_1.LANG_FR_TRANS,
    _a[lang_pt_1.LANG_PT_NAME] = lang_pt_1.LANG_PT_TRANS,
    _a);
// providers
exports.TRANSLATION_PROVIDERS = [
    { provide: exports.TRANSLATIONS, useValue: dictionary },
];
var _a;
//# sourceMappingURL=translations.js.map