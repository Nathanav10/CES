"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exchange_rates_converter_1 = require("./exchange-rates-converter");
const converter_enum_1 = require("./converter-enum");
class ConverterFactory {
    static getConverter(converter) {
        if (converter == converter_enum_1.Converter.ExchangeRates) {
            return new exchange_rates_converter_1.ExchangeRatesConverter();
        }
        throw new Error("No such conversion service");
    }
}
exports.ConverterFactory = ConverterFactory;
//# sourceMappingURL=coverter-factory.js.map