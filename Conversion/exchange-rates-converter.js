"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class ExchangeRatesConverter {
    constructor() {
        this.apiBaseUrl = `https://api.exchangeratesapi.io/latest?`;
    }
    Convert(amount, base, target) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.get(this.constructUrl(base, target)).then(res => {
                return res.data['rates'][target.toUpperCase()] * amount;
            }).catch(err => {
                if (err.response && err.response.status) {
                    throw new Error("Currency is unknown");
                }
                throw new Error("Conversion process failed");
            });
        });
    }
    constructUrl(base, target) {
        return this.apiBaseUrl + `base=${base.toUpperCase()}&symbols=${target.toUpperCase()}`;
    }
}
exports.ExchangeRatesConverter = ExchangeRatesConverter;
//# sourceMappingURL=exchange-rates-converter.js.map