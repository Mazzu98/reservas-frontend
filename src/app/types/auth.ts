export type loginRequest = {
    email: string;
    password: string;
};

export type registerRequest = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type authResponse = {
    access_token: string;
    token_type: string;
};

export type user = {
    id: number,
    name: string,
    email: string,
    role: string
}