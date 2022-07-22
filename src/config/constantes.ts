import enviroment from './enviroments';

if(process.env.NODE_ENV !== "production"){
    const env = enviroment;
}

export const SECRET_KEY = process.env.SECRET || "Lallavemaestra";

export enum COLLECTIONS {
    USERS ="users"
}

export enum MESSAGES {
    TOKEN_VERIFICATION_FAILED = "token no valido"
}

// H = horas, M = MINUTOS, D = DIAS
export enum EXPIRETIME{
    H1 = 60*60,
    H24 = 24* H1,
    M15 = H1/4,
    M30 = 2 * M15,
    D2 = 2 * H24,
    D7 = 7* H24
}