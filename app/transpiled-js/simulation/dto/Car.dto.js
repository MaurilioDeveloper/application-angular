"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Version_dto_1 = require("./Version.dto");
var Car = /** @class */ (function () {
    function Car(id, description, vehicleType, url) {
        this.id = id;
        this.description = description;
        this.vehicleType = vehicleType;
        this.url = url;
        this.version = new Version_dto_1.Version();
    }
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=Car.dto.js.map