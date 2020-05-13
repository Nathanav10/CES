"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coverter_factory_1 = require("../Conversion/coverter-factory");
class ExchangeOperator {
    constructor(conversionService) {
        this.converter = coverter_factory_1.ConverterFactory.getConverter(conversionService);
        // TODO: get commission in realtime
        this.commission = 5;
    }
    Exchange(amount, base, target) {
        // TODO: catch
        return this.converter.Convert(amount, base, target).then(convertedAmount => {
            return `From amount: ${amount}
From currency: ${base}
To currency: ${target}
Commission: ${this.commission}%
Amount before commission: ${convertedAmount}
Amount: ${convertedAmount / 100.0 * (100 - this.commission)}\n`;
        });
    }
    PrintReceipt() {
    }
}
exports.ExchangeOperator = ExchangeOperator;
//# sourceMappingURL=exchange-operator.js.map