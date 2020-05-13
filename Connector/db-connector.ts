interface DbConnector {
    dbUrl: String;

    ConfigParameter(param: string, value: any): Promise<boolean>;
}