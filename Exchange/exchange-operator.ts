import {Converter} from "../Conversion/converter-enum";
import {ConverterFactory} from "../Conversion/coverter-factory";

export class ExchangeOperator {
    converter: IConverter;
    commission: number;

    constructor(conversionService: Converter) {
        this.converter = ConverterFactory.getConverter(conversionService);
    }

    Exchange(amount: number, base: string, target: string): Promise<number> {
        // TODO: catch
        return this.converter.Convert(amount, base, target).then(convertedAmount => {
            return convertedAmount;
        })
    }
}