interface IConverter {
    Convert(amount: number, baseCurrency: string, targetCurrency: string): Promise<number>
}