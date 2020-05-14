"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coverter_factory_1 = require("../Conversion/coverter-factory");
// TODO: make service
class ExchangeService {
    constructor(conversionService) {
        this.converter = coverter_factory_1.ConverterFactory.getConverter(conversionService);
    }
    Exchange(amount, base, target) {
        return this.converter.Convert(amount, base, target).then(convertedAmount => {
            return convertedAmount;
        });
    }
}
exports.ExchangeService = ExchangeService;
//# sourceMappingURL=exchange-service.js.map