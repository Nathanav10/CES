import {ExchangeRatesConverter} from './exchange-rates-converter'
import {Converter} from "./converter-enum";

export class ConverterFactory {

    static getConverter(converter: Converter): IConverter {
        if (converter == Converter.ExchangeRates) {
            return new ExchangeRatesConverter();
        }
        throw new Error("No such conversion service")
    }
}