export type RegisterT = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
};

export type ConfirmEmailT = {
    email: string;
    code: string;
};

export type LoginT = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export type RefreshTokenT = {
    email: string;
};
