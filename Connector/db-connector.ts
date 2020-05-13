interface DbConnector {
    dbUrl: String;

    UpdateParameter(param: string, value: any): Promise<boolean>;
}