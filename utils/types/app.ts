export type StorePayload<PayloadType> = {
    payload: PayloadType;
};

export type AuthPage = "register" | "login";

export type GamePage =
    | "main"
    | "history"
    | "manage"
    | "bank"
    | "request"
    | "send";
