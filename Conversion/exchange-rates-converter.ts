import axios from 'axios';

export class ExchangeRatesConverter implements IConverter {
    apiBaseUrl = `https://api.exchangeratesapi.io/latest?`;

    async Convert(amount: number, base: string, target: string): Promise<number> {
        return axios.get(this.constructUrl(base, target)).then(res => {
            // TODO: use _.get
            return res.data['rates'][target.toUpperCase()] * amount;
        }).catch(err => {
            if (err.response && err.response.status) {
                throw new Error("Currency is unknown");
            }
            throw new Error("Conversion process failed");
        });
    }

    // TODO: private
    constructUrl(base: string, target: string) {
        return this.apiBaseUrl + `base=${base.toUpperCase()}&symbols=${target.toUpperCase()}`;
    }
}