import {Converter} from "../Conversion/converter-enum";
import {ConverterFactory} from "../Conversion/coverter-factory";

export class ExchangeOperator {
    converter: IConverter;
    commission: number;

    constructor(conversionService: Converter) {
        this.converter = ConverterFactory.getConverter(conversionService);
        // TODO: get commission in realtime
        this.commission = 5;
    }

    Exchange(amount:number, base:string, target:string): Promise<string> {
        // TODO: catch
        return this.converter.Convert(amount, base, target).then(convertedAmount => {
            return `From amount: ${amount}
From currency: ${base}
To currency: ${target}
Commission: ${this.commission}%
Amount before commission: ${convertedAmount}
Amount: ${convertedAmount / 100.0 * (100 - this.commission)}\n`
        });
    }

    PrintReceipt() {

    }
}