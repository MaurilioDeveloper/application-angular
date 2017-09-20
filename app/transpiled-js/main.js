"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
// Enable production mode unless running locally
/*if (!/localhost/.test(document.location.host)) {*/
core_1.enableProdMode();
//}
platform.bootstrapModule(app_module_1.AppModule)
    .then(function (success) { })
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map