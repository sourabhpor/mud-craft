export declare enum Environment {
    Local = "",
    Development = "development",
    Production = "production",
    Staging = "staging"
}
export declare class EnvVariablesDto {
    NODE_ENV: Environment;
    APP_URL: string;
    PORT: number;
    CREDENTIALS: boolean;
    ORIGIN: string;
    ACCESS_TOKEN_SECRET: string;
    FORGET_PASSWORD_TOKEN_EXPIRATION: string;
    ACCESS_TOKEN_EXPIRATION: string;
    REACT_APP_URL: string;
    LOG_FORMAT: string;
    LOG_DIR: string;
}
export declare function validate(config: Record<string, unknown>): EnvVariablesDto;
